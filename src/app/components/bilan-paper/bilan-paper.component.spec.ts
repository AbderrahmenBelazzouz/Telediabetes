import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilanPaperComponent } from './bilan-paper.component';

describe('BilanPaperComponent', () => {
  let component: BilanPaperComponent;
  let fixture: ComponentFixture<BilanPaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BilanPaperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BilanPaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
