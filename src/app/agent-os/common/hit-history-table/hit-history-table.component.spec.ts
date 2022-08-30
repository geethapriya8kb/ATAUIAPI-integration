import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitHistoryTableComponent } from './hit-history-table.component';

describe('HitHistoryTableComponent', () => {
  let component: HitHistoryTableComponent;
  let fixture: ComponentFixture<HitHistoryTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HitHistoryTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HitHistoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
