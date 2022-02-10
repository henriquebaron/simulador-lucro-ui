import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { da } from 'date-fns/locale';
import { Servico } from 'src/shared/servico';
import { RetornoAddEditServico } from '../retorno-add-edit-servico';

@Component({
  selector: 'app-add-edit-servico',
  templateUrl: './add-edit-servico.component.html',
  styleUrls: ['./add-edit-servico.component.css']
})
export class AddEditServicoComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal) { }

  @Input() servico: Servico = new Servico();
  @Input() nomeJanela: string = "";
  duracao: Date = new Date();

  ngOnInit(): void {
    this.duracao.setHours(Servico.getHoras(this.servico));
    this.duracao.setMinutes(Servico.getMinutos(this.servico));
  }

  salvar() {
    this.servico.duracao = Servico.duracaoAsString(this.duracao.getHours(), this.duracao.getMinutes());
    const dadosResult: RetornoAddEditServico = {
      servico: this.servico
    }
    this.activeModal.close(dadosResult);
  }

  abrirModalApagar(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-apagar' }).result.then((result) => {
      const dadosResult: RetornoAddEditServico = {
        servico: this.servico,
        delete: true
      }
      this.activeModal.close(dadosResult);
    }, () => { })
  }

}
