import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgingAmountComponent } from './aging-amount.component';

describe('AgingAmountComponent', () => {
  let component: AgingAmountComponent;
  let fixture: ComponentFixture<AgingAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgingAmountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgingAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
