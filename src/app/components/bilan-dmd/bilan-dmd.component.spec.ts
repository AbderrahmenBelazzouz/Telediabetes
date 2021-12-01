import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanDmdComponent } from './bilan-dmd.component';

describe('BilanDmdComponent', () => {
  let component: BilanDmdComponent;
  let fixture: ComponentFixture<BilanDmdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanDmdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanDmdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
