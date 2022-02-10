import { APP_BOOTSTRAP_LISTENER, Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ApicallService } from 'src/app/apicall.service';
import { Servico } from 'src/shared/servico';
import { AddEditServicoComponent } from '../add-edit-servico/add-edit-servico.component';
import { RetornoAddEditServico } from '../retorno-add-edit-servico';

@Component({
  selector: 'app-show-servicos',
  templateUrl: './show-servicos.component.html',
  styleUrls: ['./show-servicos.component.css']
})
export class ShowServicosComponent implements OnInit {

  constructor(private apiService: ApicallService, private modalService: NgbModal) { }

  listaServicos: Servico[] = [];
  servico: Servico = new Servico();
  colunasExibicao: string[] = ['nome', 'descricao', 'duracao', 'valor'];

  formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  ngOnInit(): void {
    this.obterListaServicos();
  }

  obterListaServicos() {
    this.apiService.getListaServicos().subscribe(data => {
      this.listaServicos = data;
    })
  }

  async addServico() {
    const modalRef = this.abrirJanelaEdicao("Adicionar serviço", this.servico);
    await modalRef.result.then((result) => {
      const servico = (result as RetornoAddEditServico).servico;
      if (servico) {
        this.apiService.adicionarServico(servico).subscribe(() => this.obterListaServicos());
      }
    }, () => { });
  }

  async editServico(servico: Servico) {
    const modalRef = this.abrirJanelaEdicao("Editar serviço", servico);
    await modalRef.result.then(result => {
      const retornoAddEdit = result as RetornoAddEditServico;
      if (retornoAddEdit.servico) {
        if (!retornoAddEdit.delete) {
          this.apiService.atualizarServico(retornoAddEdit.servico).subscribe(() => this.obterListaServicos());
        } else {
          this.apiService.removerServico(retornoAddEdit.servico.id).subscribe(() => this.obterListaServicos());
        }
      }
    }, () => { });
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

  private abrirJanelaEdicao(nomeJanela: string, servico: Servico): NgbModalRef {
    const modalRef = this.modalService.open(AddEditServicoComponent);
    modalRef.componentInstance.nomeJanela = nomeJanela;
    modalRef.componentInstance.servico = servico;
    return modalRef;
  }

}
