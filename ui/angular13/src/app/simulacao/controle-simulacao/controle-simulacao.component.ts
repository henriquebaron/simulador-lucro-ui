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
  faturamento: string = "";

  ngOnInit(): void {
  }

  atualizarSimulacao(): void {
    let valorFaturamento = 0;
    let formatter = new Intl.NumberFormat("pt-BR", {
      style: 'currency',
      currency: 'BRL',
    });
    this.apiService.calcularFaturamento(this.simulacoes).subscribe(response => {
      valorFaturamento = response
      this.faturamento = formatter.format(valorFaturamento);
    });
  }

}
