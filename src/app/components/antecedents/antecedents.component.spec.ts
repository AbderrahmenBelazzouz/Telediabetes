import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntecedentsComponent } from './antecedents.component';

describe('AntecedentsComponent', () => {
  let component: AntecedentsComponent;
  let fixture: ComponentFixture<AntecedentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntecedentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AntecedentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
