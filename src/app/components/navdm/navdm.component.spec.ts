import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavdmComponent } from './navdm.component';

describe('NavdmComponent', () => {
  let component: NavdmComponent;
  let fixture: ComponentFixture<NavdmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavdmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavdmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
