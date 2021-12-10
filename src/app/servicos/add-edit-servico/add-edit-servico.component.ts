import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Servico } from 'src/app/servico';
import { RetornoAddEditServico } from '../retorno-add-edit-servico';

@Component({
  selector: 'app-add-edit-servico',
  templateUrl: './add-edit-servico.component.html',
  styleUrls: ['./add-edit-servico.component.css']
})
export class AddEditServicoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  @Input() servico: Servico = new Servico();
  @Input() nomeJanela: string = "";
  minutos: number = 0;
  horas: number = 0;

  ngOnInit(): void {
    this.minutos = Servico.getMinutos(this.servico);
    this.horas = Servico.getHoras(this.servico);
   }

  salvar() {
    this.servico.duracao = Servico.duracaoAsString(this.horas, this.minutos);
    const dadosResult: RetornoAddEditServico = {
      servico: this.servico
    }
    this.activeModal.close(dadosResult);
  }

}
