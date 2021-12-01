import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IotmedComponent } from './iotmed.component';

describe('IotmedComponent', () => {
  let component: IotmedComponent;
  let fixture: ComponentFixture<IotmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IotmedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IotmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
