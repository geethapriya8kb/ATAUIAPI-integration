import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingCardWidgetComponent } from './billing-card-widget.component';

describe('BillingCardWidgetComponent', () => {
  let component: BillingCardWidgetComponent;
  let fixture: ComponentFixture<BillingCardWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillingCardWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingCardWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
