import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ServicosComponent } from './servicos/servicos.component';

const routes: Routes = [
  { path: 'servicos', component: ServicosComponent },
  { path: 'agenda', component: AgendaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
