import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnavComponent } from './ppnav.component';

describe('PpnavComponent', () => {
  let component: PpnavComponent;
  let fixture: ComponentFixture<PpnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PpnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
