import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinDMSComponent } from './medecin-dms.component';

describe('MedecinDMSComponent', () => {
  let component: MedecinDMSComponent;
  let fixture: ComponentFixture<MedecinDMSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedecinDMSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedecinDMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
