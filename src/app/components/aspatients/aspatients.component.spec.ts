import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ASpatientsComponent } from './aspatients.component';

describe('ASpatientsComponent', () => {
  let component: ASpatientsComponent;
  let fixture: ComponentFixture<ASpatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ASpatientsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ASpatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
