import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSimulacaoComponent } from './add-edit-simulacao.component';

describe('AddEditSimulacaoComponent', () => {
  let component: AddEditSimulacaoComponent;
  let fixture: ComponentFixture<AddEditSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditSimulacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
