import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSimulacaoDiaComponent } from './show-simulacao-dia.component';

describe('ShowSimulacaoDiaComponent', () => {
  let component: ShowSimulacaoDiaComponent;
  let fixture: ComponentFixture<ShowSimulacaoDiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSimulacaoDiaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSimulacaoDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
