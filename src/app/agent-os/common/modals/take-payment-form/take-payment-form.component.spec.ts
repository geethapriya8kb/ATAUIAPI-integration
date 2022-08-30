import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TakePaymentFormComponent } from './take-payment-form.component';

describe('TakePaymentFormComponent', () => {
  let component: TakePaymentFormComponent;
  let fixture: ComponentFixture<TakePaymentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TakePaymentFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TakePaymentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
