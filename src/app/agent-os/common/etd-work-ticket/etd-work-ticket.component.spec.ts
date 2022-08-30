import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtdWorkTicketComponent } from './etd-work-ticket.component';

describe('EtdWorkTicketComponent', () => {
  let component: EtdWorkTicketComponent;
  let fixture: ComponentFixture<EtdWorkTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtdWorkTicketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtdWorkTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
