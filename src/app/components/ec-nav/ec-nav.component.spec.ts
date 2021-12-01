import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcNavComponent } from './ec-nav.component';

describe('EcNavComponent', () => {
  let component: EcNavComponent;
  let fixture: ComponentFixture<EcNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
