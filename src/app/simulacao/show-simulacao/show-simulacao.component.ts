import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';
import { AddEditSimulacaoComponent } from '../add-edit-simulacao/add-edit-simulacao.component';
import { Servico } from 'src/shared/servico';
import { ConversaoHora } from 'src/shared/conversao-hora';
import { RetornoAddEditSimulacao } from '../retorno-add-edit-simulacao';

@Component({
  selector: 'app-show-simulacao',
  templateUrl: './show-simulacao.component.html',
  styleUrls: ['./show-simulacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSimulacaoComponent implements OnInit {

  @Output() simulacoesEvent = new EventEmitter<AgendamentoSimulacao[]>();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  refresh: Subject<any> = new Subject();
  viewDate: Date = new Date();
  dayStartHour: number = 6;
  dayEndHour: number = 22;
  hourSegments: number = 2;
  hourSegmentHeight: number = 30;

  simulacoes: AgendamentoSimulacao[] = [];
  events: CalendarEvent[] = []

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    var simulacaoSelecionada = this.obterSimulacaoPorEvento(event);
    const newStartSTring = ConversaoHora.getStringHora(newStart);
    simulacaoSelecionada.hora = newStartSTring;
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next(null);
  }

  eventClicked({ event }: { event: CalendarEvent }): void {
    this.editarSimulacao(event);
  }

  hourSegmentClicked(date: Date, sourceEvent: MouseEvent): void {
    this.adicionarSimulacao(date);
  }

  private async adicionarSimulacao(date: Date): Promise<void> {
    const modalRef = this.abrirJanelaEdicao("Novo agendamento", date);

    var servicoSelecionado: Servico | null = new Servico();
    await modalRef.result.then((result) => {
      const dadosResult = result as RetornoAddEditSimulacao;
      servicoSelecionado = dadosResult.servico;
      date = dadosResult.hora;
    }, () => { });

    /* Encerra o m??todo se a janela de sele????o foi fechada e o 
    servico selecionado n??o foi atribu??do */
    if (servicoSelecionado?.id == 0) return;

    var simulacao = new AgendamentoSimulacao();
    simulacao.servicoId = servicoSelecionado.id
    simulacao.hora = AgendamentoSimulacao.horaAsString(date.getHours(), date.getMinutes());

    const horaTerminoString = simulacao.getHoraTermino(servicoSelecionado);
    var horaTermino = ConversaoHora.getDateFromString(horaTerminoString);

    var novoEvento: CalendarEvent = {
      title: servicoSelecionado.nome,
      start: date,
      end: horaTermino,
      draggable: true,
    };

    this.events.push(novoEvento);
    this.simulacoes.push(simulacao);
    this.refresh.next(null);
    this.simulacoesEvent.emit(this.simulacoes);
  }

  private editarSimulacao(event: CalendarEvent): void {
    var simulacaoSelecionada = this.obterSimulacaoPorEvento(event);

    const modalRef = this.abrirJanelaEdicao("Editar agendamento", event.start);
    modalRef.componentInstance.idSelecionado = simulacaoSelecionada.servicoId;
    modalRef.componentInstance.exibirBotaoRemover = true;

    modalRef.result.then((result) => {
      const dadosResult = result as RetornoAddEditSimulacao;

      if (!dadosResult.delete) {
        simulacaoSelecionada.servicoId = dadosResult.servico?.id ?? 0;
        simulacaoSelecionada.hora = ConversaoHora.getStringHora(dadosResult.hora);
        event.title = dadosResult.servico?.nome ?? "";
        event.start = dadosResult.hora;
        event.end = ConversaoHora.getDateFromString(simulacaoSelecionada.getHoraTermino(dadosResult.servico));
      } else {
        var index = this.simulacoes.findIndex(item =>
          item.hora == ConversaoHora.getStringHora(dadosResult.hora));
        if (index > -1) {
          this.simulacoes.splice(index, 1);
        } else throw new Error("Erro ao buscar pela simula????o de agendamento a excluir.");

        index = this.events.findIndex(item => item.start == dadosResult.hora);
        if (index > -1) {
          this.events.splice(index, 1);
        } else throw new Error("Erro ao buscar pelo Event a excluir.");
      }
      this.refresh.next(null);
      this.simulacoesEvent.emit(this.simulacoes);
    })
  }

  private obterSimulacaoPorEvento(event: CalendarEvent): AgendamentoSimulacao {
    // Busca um agendamento correspondente ao evento, buscando pela hora de in??cio
    const eventStartString = ConversaoHora.getStringHora(event.start);
    return this.simulacoes.filter((value) => value.hora == eventStartString)[0];
  }

  private abrirJanelaEdicao(nomeJanela: string, horaInicial: Date): NgbModalRef {
    const modalRef = this.modalService.open(AddEditSimulacaoComponent);
    modalRef.componentInstance.nomeJanela = nomeJanela;
    modalRef.componentInstance.horaInicial = horaInicial;
    return modalRef;
  }

}
