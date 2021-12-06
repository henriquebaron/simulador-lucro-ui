import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { Servico } from 'src/app/servico';
import { ServicosComponent } from '../servicos.component';

@Component({
  selector: 'app-show-servicos',
  templateUrl: './show-servicos.component.html',
  styleUrls: ['./show-servicos.component.css']
})
export class ShowServicosComponent implements OnInit {

  constructor(private apiService: ApicallService) { }

  listaServicos: Servico[] = [];
  servico: Servico = new Servico();

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
    this.servico = new Servico();
    this.ativarAddEditCompleto = true;
  }

  editServico(servico: Servico) {
    this.modalTitle = "Editar serviço";
    this.servico = servico;
    this.ativarAddEditCompleto = true;
  }

  deleteServico(servico: Servico) {
    if (confirm('Tem certeza que deseja apagar?')) {
      this.apiService.removerServico(servico.id).subscribe(res => {
        if ((res as Servico).id == servico.id) {
          alert("Removido com sucesso.");
          this.obterListaServicos();
        }
      });
    }
  }

  fechaModal() {
    this.ativarAddEditCompleto = false;
    this.obterListaServicos();
  }

}
