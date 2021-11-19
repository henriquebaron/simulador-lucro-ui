import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicallService {
  private readonly apiUrl = "http://localhost:5000/api";

  constructor(private api:HttpClient) { }

  getListaServicos():Observable<any[]>{
    return this.api.get<any>(this.apiUrl + "/servicos");
  }

  adicionarServico(servico:any){
    return this.api.post(this.apiUrl + "/servicos", servico);
  }

  atualizarServico(servico:any){
    return this.api.put(this.apiUrl + "/servicos/" + servico.id, servico);
  }

  removerServico(id:any){
    return this.api.delete(this.apiUrl + "/servicos/" + id);
  }
}
