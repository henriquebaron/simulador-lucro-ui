import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControleSimulacaoComponent } from './controle-simulacao.component';

describe('ControleSimulacaoComponent', () => {
  let component: ControleSimulacaoComponent;
  let fixture: ComponentFixture<ControleSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControleSimulacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControleSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
