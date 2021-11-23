import { Component, Input, OnInit } from '@angular/core';
import { ApicallService } from 'src/app/apicall.service';
import { Servico } from 'src/app/servico';

@Component({
  selector: 'app-add-edit-servico',
  templateUrl: './add-edit-servico.component.html',
  styleUrls: ['./add-edit-servico.component.css']
})
export class AddEditServicoComponent implements OnInit {

  constructor(private apiService: ApicallService) { }

  @Input() servico: Servico = new Servico();
  minutos: number = 0;
  horas: number = 0;

  ngOnInit(): void {
    this.minutos = Servico.getMinutos(this.servico);
    this.horas = Servico.getHoras(this.servico);
   }

  addServico() {
    this.servico.duracao = Servico.duracaoAsString(this.horas, this.minutos);
    this.apiService.adicionarServico(this.servico).subscribe(res => { console.log(res) });
  }

  editServico() {
    this.servico.duracao = Servico.duracaoAsString(this.horas, this.minutos);
    this.apiService.atualizarServico(this.servico).subscribe(res => { console.log(res) });
  }

}
