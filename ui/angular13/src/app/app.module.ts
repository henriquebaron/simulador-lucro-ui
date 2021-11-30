import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApicallService } from './apicall.service';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns'

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicosComponent } from './servicos/servicos.component';
import { ShowServicosComponent } from './servicos/show-servicos/show-servicos.component';
import { AddEditServicoComponent } from './servicos/add-edit-servico/add-edit-servico.component';
import { AgendaComponent } from './agenda/agenda.component';
import { SimulacaoComponent } from './simulacao/simulacao.component';
import { ShowSimulacaoComponent } from './simulacao/show-simulacao/show-simulacao.component';
import { AddEditSimulacaoComponent } from './simulacao/add-edit-simulacao/add-edit-simulacao.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicosComponent,
    ShowServicosComponent,
    AddEditServicoComponent,
    AgendaComponent,
    SimulacaoComponent,
    ShowSimulacaoComponent,
    AddEditSimulacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [ApicallService],
  bootstrap: [AppComponent]
})
export class AppModule { }
