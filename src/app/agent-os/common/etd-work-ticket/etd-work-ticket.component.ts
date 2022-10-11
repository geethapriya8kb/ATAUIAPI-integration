import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { SearchService } from '../../services/search.service';
import { EtdService } from '../../tabs/etd/etd.service';

@Component({
  selector: 'app-etd-work-ticket',
  templateUrl: './etd-work-ticket.component.html',
  styleUrls: ['./etd-work-ticket.component.scss']
})
export class EtdWorkTicketComponent implements OnInit {
  workTicketId: string;
  etddata: any;
  tempData: any;
  etdTicketdata: any;
  accountVal: unknown;
  data: any;
  accountId = new UntypedFormGroup({
    accountNumber: new UntypedFormControl(),
    locationId: new UntypedFormControl()
  })
  constructor(private searchService: SearchService,
    private etdservice: EtdService,
    private accountServ: AccountService) { }

  ngOnInit(): void {
    this.etdDropData();
    const accountNumber = this.searchService.getAccountNumber();
    this.accountServ.ticketId.subscribe((value) => {
      this.workTicketId = value;

    });
    this.getCardData(accountNumber);
  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getCardData(this.accountVal);
      } else {
        this.getCardData('');
      }
    });
  }

  findAccount() {
    console.log(this.accountId.value);
  }

  etdDropData() {
    const dataFileName = `assets/data/etd-table.json`;
    this.accountServ.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.etddata = resp
      },
      (err) => console.error(err),
      () => {
        console.log(this.etddata);
      }
    );
  }

  returnZero = () => 0;

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName = 'etd-account';
    this.etdservice.getdatafromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.data = JSON.parse(resp.content);
        this.tempData = this.data;
        for (let i = 0; i <= this.tempData.content?.length; i++) {
          if (this.tempData.content[i]?.Ticket === this.workTicketId) 
          {
            this.etdTicketdata = this.tempData.content[i];
            console.log(this.etdTicketdata);
          }
        }
      }
    })
  }
}
