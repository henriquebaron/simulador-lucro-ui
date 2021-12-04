import { Component, Input, OnInit } from '@angular/core';
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';

@Component({
  selector: 'app-controle-simulacao',
  templateUrl: './controle-simulacao.component.html',
  styleUrls: ['./controle-simulacao.component.css']
})
export class ControleSimulacaoComponent implements OnInit {

  constructor() { }

  @Input() simulacoes: AgendamentoSimulacao[] = [];
  faturamento: number = 0;

  ngOnInit(): void {
  }

}
