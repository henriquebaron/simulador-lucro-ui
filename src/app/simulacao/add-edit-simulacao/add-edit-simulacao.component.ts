import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Servico } from 'src/shared/servico';
import { RetornoAddEditSimulacao } from '../retorno-add-edit-simulacao';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-add-edit-simulacao',
  templateUrl: './add-edit-simulacao.component.html',
  styleUrls: ['./add-edit-simulacao.component.css']
})
export class AddEditSimulacaoComponent implements OnInit {
  @Input() nomeJanela: string = "";
  @Input() horaInicial: Date = new Date();
  @Input() idSelecionado: number = 0;
  @Input() exibirBotaoRemover = false;
  
  servicos: Servico[] = [];
  horaSelecionada: Date = new Date();

  constructor(public activeModal: NgbActiveModal, public apiService: ApicallService) { }

  ngOnInit(): void {
    this.apiService.getListaServicos().subscribe((result) => {
      this.servicos = result;
    });
    this.horaSelecionada = this.horaInicial;
  }

  salvar(): void {
    if (this.idSelecionado > 0) {
      const servicoSelecionado = this.servicos.filter((value) => value.id == this.idSelecionado)[0];
      const dadosResult: RetornoAddEditSimulacao = {
        servico: servicoSelecionado,
        hora: this.horaSelecionada,
        delete: false,
      };
      this.activeModal.close(dadosResult);
    }
  }

  apagar(): void {
    const dadosResult: RetornoAddEditSimulacao = {
      servico: null,
      hora: this.horaInicial,
      delete: true,
    }
    this.activeModal.close(dadosResult);
  }

}
