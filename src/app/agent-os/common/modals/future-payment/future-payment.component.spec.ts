import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturePaymentComponent } from './future-payment.component';

describe('FuturePaymentComponent', () => {
  let component: FuturePaymentComponent;
  let fixture: ComponentFixture<FuturePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuturePaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FuturePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
