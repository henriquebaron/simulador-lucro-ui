import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
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

  editServico(servico: any) {
    this.modalTitle = "Editar serviço";
    this.servico = servico;
    this.ativarAddEditCompleto = true;
  }

  deleteServico(servico: any) {
    if (confirm('Tem certeza que deseja apagar?')) {
      this.apiService.removerServico(servico.id).subscribe(res => { alert(res.toString()); });
    }
    this.obterListaServicos();
  }

  fechaModal() {
    this.ativarAddEditCompleto = false;
    this.obterListaServicos();
  }

}
