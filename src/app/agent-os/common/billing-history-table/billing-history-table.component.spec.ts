import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { BillingHistoryTableComponent } from './billing-history-table.component';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';

describe('BillingHistoryTableComponent', () => {
  let component: BillingHistoryTableComponent;
  let fixture: ComponentFixture<BillingHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [BillingHistoryTableComponent],
      providers: [SearchService, CardDataService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
