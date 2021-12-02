import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Servico } from 'src/app/servico';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-add-edit-simulacao',
  templateUrl: './add-edit-simulacao.component.html',
  styleUrls: ['./add-edit-simulacao.component.css']
})
export class AddEditSimulacaoComponent implements OnInit {
  @Input() nomeJanela: string = "";

  idSelecionado: number = 0;
  servicos: Servico[] = [];

  constructor(public activeModal: NgbActiveModal, public apiService: ApicallService) { }

  ngOnInit(): void {
    this.apiService.getListaServicos().subscribe((result) => {
      this.servicos = result;
    });
  }

  salvar(): void {
    if (this.idSelecionado > 0) {
      const servicoSelecionado = this.servicos.filter((value) => value.id == this.idSelecionado)[0];
      this.activeModal.close(servicoSelecionado);
    }
  }

}
