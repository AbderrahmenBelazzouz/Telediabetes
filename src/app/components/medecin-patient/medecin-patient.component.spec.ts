import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinPatientComponent } from './medecin-patient.component';

describe('MedecinPatientComponent', () => {
  let component: MedecinPatientComponent;
  let fixture: ComponentFixture<MedecinPatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinPatientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
