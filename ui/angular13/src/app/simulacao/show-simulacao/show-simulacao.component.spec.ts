import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSimulacaoComponent } from './show-simulacao.component';

describe('ShowSimulacaoComponent', () => {
  let component: ShowSimulacaoComponent;
  let fixture: ComponentFixture<ShowSimulacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSimulacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSimulacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
