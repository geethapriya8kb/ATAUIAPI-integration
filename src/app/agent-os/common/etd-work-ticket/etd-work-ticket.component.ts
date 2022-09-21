import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';

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
  constructor(private accountServ:AccountService) { }
  etddata:any;
  ngOnInit(): void {
    this.etdDropData();
  }

  findAccount() {
    console.log(this.accountId.value);
  }
  
  etdDropData(){
    const dataFileName = `assets/data/etd-table.json`;
    this.accountServ.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.etddata= resp
      },
      (err) => console.error(err),
      () => {
        console.log(this.etddata);
      }
    );
  }
}
