import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ServicosComponent } from './servicos/servicos.component';
import { SimulacaoComponent } from './simulacao/simulacao.component';

const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: 'agenda', component: AgendaComponent },
  { path: 'simulacao', component: SimulacaoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
