import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutageHistoryComponent } from './outage-history.component';

describe('OutageHistoryComponent', () => {
  let component: OutageHistoryComponent;
  let fixture: ComponentFixture<OutageHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutageHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
