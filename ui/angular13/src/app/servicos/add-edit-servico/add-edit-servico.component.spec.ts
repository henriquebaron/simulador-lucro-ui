import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServicoComponent } from './add-edit-servico.component';

describe('AddEditServicoComponent', () => {
  let component: AddEditServicoComponent;
  let fixture: ComponentFixture<AddEditServicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditServicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
