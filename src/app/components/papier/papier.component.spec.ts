import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PapierComponent } from './papier.component';

describe('PapierComponent', () => {
  let component: PapierComponent;
  let fixture: ComponentFixture<PapierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PapierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PapierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
