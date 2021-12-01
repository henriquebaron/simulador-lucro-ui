import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgendamentoSimulacao } from 'src/app/agendamento-simulacao';

@Component({
  selector: 'app-add-edit-simulacao',
  templateUrl: './add-edit-simulacao.component.html',
  styleUrls: ['./add-edit-simulacao.component.css']
})
export class AddEditSimulacaoComponent implements OnInit {
  @Input() name: any;
  @Input() agendamento: AgendamentoSimulacao | undefined;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    console.log(this.agendamento?.hora);
  }

}
