import { Component, Input, OnInit } from '@angular/core';
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-controle-simulacao',
  templateUrl: './controle-simulacao.component.html',
  styleUrls: ['./controle-simulacao.component.css']
})
export class ControleSimulacaoComponent implements OnInit {

  constructor(private apiService: ApicallService) { }

  @Input() simulacoes: AgendamentoSimulacao[] = [];
  faturamento: number = 0;

  ngOnInit(): void {
  }

  atualizarSimulacao(): void {
    this.apiService.calcularFaturamento(this.simulacoes).subscribe(response => this.faturamento = response);
  }

}
