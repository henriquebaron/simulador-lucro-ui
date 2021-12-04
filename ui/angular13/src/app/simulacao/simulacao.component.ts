import { Component, OnInit } from '@angular/core';
import { AgendamentoSimulacao } from '../agendamento-simulacao';

@Component({
  selector: 'app-simulacao',
  templateUrl: './simulacao.component.html',
  styleUrls: ['./simulacao.component.css']
})
export class SimulacaoComponent implements OnInit {

  constructor() { }

  simulacoes: AgendamentoSimulacao[] = [];

  ngOnInit(): void {
  }

}
