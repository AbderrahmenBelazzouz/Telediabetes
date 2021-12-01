import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AidsoignantDashboardComponent } from './aidsoignant-dashboard.component';

describe('AidsoignantDashboardComponent', () => {
  let component: AidsoignantDashboardComponent;
  let fixture: ComponentFixture<AidsoignantDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AidsoignantDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AidsoignantDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
