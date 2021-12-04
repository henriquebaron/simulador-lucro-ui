import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/internal/Subject';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar'
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';
import { AddEditSimulacaoComponent } from '../add-edit-simulacao/add-edit-simulacao.component';
import { Servico } from 'src/app/servico';
import { ConversaoHora } from 'src/app/conversao-hora';
import { RetornoAddEditSimulacao } from '../retorno-add-edit-simulacao';

@Component({
  selector: 'app-show-simulacao',
  templateUrl: './show-simulacao.component.html',
  styleUrls: ['./show-simulacao.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowSimulacaoComponent implements OnInit {

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

    /* Encerra o método se a janela de seleção foi fechada e o 
    servico selecionado não foi atribuído */
    if (servicoSelecionado?.id == 0) return;

    var simulacao = new AgendamentoSimulacao();
    simulacao.idServico = servicoSelecionado.id
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
  }

  private editarSimulacao(event: CalendarEvent): void {
    var simulacaoSelecionada = this.obterSimulacaoPorEvento(event);

    const modalRef = this.abrirJanelaEdicao("Editar agendamento", event.start);
    modalRef.componentInstance.idSelecionado = simulacaoSelecionada.idServico;
    modalRef.componentInstance.exibirBotaoRemover = true;

    modalRef.result.then((result) => {
      const dadosResult = result as RetornoAddEditSimulacao;

      if (!dadosResult.delete) {
        simulacaoSelecionada.idServico = dadosResult.servico?.id ?? 0;
        simulacaoSelecionada.hora = ConversaoHora.getStringHora(dadosResult.hora);
        event.title = dadosResult.servico?.nome ?? "";
        event.start = dadosResult.hora;
        event.end = ConversaoHora.getDateFromString(simulacaoSelecionada.getHoraTermino(dadosResult.servico));
      } else {
        var index = this.simulacoes.findIndex(item =>
          item.hora == ConversaoHora.getStringHora(dadosResult.hora));
        if (index > -1) {
          this.simulacoes.splice(index, 1);
        } else throw new Error("Erro ao buscar pela simulação de agendamento a excluir.");

        index = this.events.findIndex(item => item.start == dadosResult.hora);
        if (index > -1) {
          this.events.splice(index, 1);
        } else throw new Error("Erro ao buscar pelo Event a excluir.");
      }
      this.refresh.next(null);
      console.log(this.simulacoes);
      console.log(this.events);
    })
  }

  private obterSimulacaoPorEvento(event: CalendarEvent): AgendamentoSimulacao {
    // Busca um agendamento correspondente ao evento, buscando pela hora de início
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
