import { Component, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';

@Component({
  selector: 'app-show-servicos',
  templateUrl: './show-servicos.component.html',
  styleUrls: ['./show-servicos.component.css']
})
export class ShowServicosComponent implements OnInit {

  constructor(private apiService: ApicallService) { }

  listaServicos: any = [];
  servico: any;

  ativarAddEditCompleto: boolean = false;
  modalTitle: string = "";

  ngOnInit(): void {
    this.obterListaServicos();
  }

  obterListaServicos() {
    this.apiService.getListaServicos().subscribe(data => {
      this.listaServicos = data;
    })
  }

  addServico() {
    this.modalTitle = "Adicionar serviço";
    this.servico = {
      id: 0,
      nome: "",
      descricao: "",
      duracao: "00:00",
      valor: 0,
      custo: 0
    };
    this.ativarAddEditCompleto = true;
  }

  fechaModal() {
    this.ativarAddEditCompleto = false;
    this.obterListaServicos();
  }

}
