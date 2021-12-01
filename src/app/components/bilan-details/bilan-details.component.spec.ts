import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDetailsComponent } from './bilan-details.component';

describe('BilanDetailsComponent', () => {
  let component: BilanDetailsComponent;
  let fixture: ComponentFixture<BilanDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
