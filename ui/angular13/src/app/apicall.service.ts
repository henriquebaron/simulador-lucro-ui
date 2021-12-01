import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servico } from './servico';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  private readonly apiUrl = "http://localhost:5000/api";

  constructor(private api: HttpClient) { }

  getListaServicos(): Observable<Servico[]> {
    return this.api.get<Servico[]>(this.apiUrl + "/servicos");
  }

  getServico(id: number): Observable<Servico> {
    return this.api.get<Servico>(this.apiUrl + '/servicos/' + id);
  }

  adicionarServico(servico: Servico) {
    return this.api.post(this.apiUrl + "/servicos", servico);
  }

  atualizarServico(servico: Servico) {
    return this.api.put(this.apiUrl + "/servicos/" + servico.id, servico);
  }

  removerServico(id: number) {
    return this.api.delete(this.apiUrl + "/servicos/" + id);
  }
}
