import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListServicosComponent } from './list-servicos/list-servicos.component';

const routes: Routes = [
  { path:'servicos', component:ListServicosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
