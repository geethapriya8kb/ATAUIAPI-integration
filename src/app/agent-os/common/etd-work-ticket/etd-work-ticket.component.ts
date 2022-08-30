import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-etd-work-ticket',
  templateUrl: './etd-work-ticket.component.html',
  styleUrls: ['./etd-work-ticket.component.scss']
})
export class EtdWorkTicketComponent implements OnInit {

  accountId=new UntypedFormGroup({
    accountNumber: new UntypedFormControl(),
    locationId:new UntypedFormControl()
  })
  constructor() { }

  ngOnInit(): void {
  }

  findAccount() {
    console.log(this.accountId.value);
  }
  
}
