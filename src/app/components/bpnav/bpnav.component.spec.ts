import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpnavComponent } from './bpnav.component';

describe('BpnavComponent', () => {
  let component: BpnavComponent;
  let fixture: ComponentFixture<BpnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpnavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
