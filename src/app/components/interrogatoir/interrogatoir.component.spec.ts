import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogatoirComponent } from './interrogatoir.component';

describe('InterrogatoirComponent', () => {
  let component: InterrogatoirComponent;
  let fixture: ComponentFixture<InterrogatoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterrogatoirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterrogatoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
