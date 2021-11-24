import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApicallService } from './apicall.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicosComponent } from './servicos/servicos.component';
import { ShowServicosComponent } from './servicos/show-servicos/show-servicos.component';
import { AddEditServicoComponent } from './servicos/add-edit-servico/add-edit-servico.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ShowSimulacaoDiaComponent } from './agenda/show-simulacao-dia/show-simulacao-dia.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicosComponent,
    ShowServicosComponent,
    AddEditServicoComponent,
    AgendaComponent,
    ShowSimulacaoDiaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApicallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
