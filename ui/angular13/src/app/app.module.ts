import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApicallService } from './apicall.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicosComponent } from './servicos/servicos.component';
import { ShowServicosComponent } from './servicos/show-servicos/show-servicos.component';

@NgModule({
  declarations: [
    AppComponent,
    ServicosComponent,
    ShowServicosComponent
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
