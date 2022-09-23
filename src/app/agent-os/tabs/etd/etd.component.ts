import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { AccountService } from '../../services/account.service';
import { SearchService } from '../../services/search.service';
import { EtdResponse, Mytickettab, TicketInformation } from './etd.response';
import { EtdService } from './etd.service';

@Component({
  selector: 'app-etd',
  templateUrl: './etd.component.html',
  styleUrls: ['./etd.component.scss']
})
export class EtdComponent implements OnInit {
  flag: boolean = false;
  data: EtdResponse;
  etddata: any;
  dataSource = new MatTableDataSource<TicketInformation>();
  columnsToDisplay: Array<string> = [];
  tableDatatest: Array<TicketInformation> = [];
  myticketTabTableDatatest: Array<Mytickettab> = new Array<Mytickettab>();
  hisDataSource = new MatTableDataSource<string>();
  hisColumnsToDisplay: string[] = [];
  histableDatatest: Array<string> = new Array<string>();
  myTicketDataSource = new MatTableDataSource<Mytickettab>();
  ticketColumnsToDisplay: Array<string> = [];
  accountVal: unknown;
  public searchFilter: any = '';
  filterAlert: Array<TicketInformation> = [];
  query: any;
  etdValue = new UntypedFormGroup({
    startDate: new UntypedFormControl(),
    endDate: new UntypedFormControl(),
    custType: new UntypedFormControl(),
    reasons: new UntypedFormControl(),
    managmentArea: new UntypedFormControl(),
    status: new UntypedFormControl(),
    search: new UntypedFormControl()
  })

  constructor(private searchService: SearchService, private etdservice: EtdService, private accountServ: AccountService
  ) { }

  ngOnInit(): void {
    this.etdData();
    this.etdDropData();
    const accountNumber = this.searchService.getAccountNumber();
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

  filter() {
    const searchTicket = this.etdValue.value;
    console.log(searchTicket);
    if (searchTicket) {
      for (let i = 0; i < this.data.content.length; i++) {
        console.log(this.data);
        console.log(this.data.content[i].Ticket);
        console.log(this.data.content[i].Ticket.toLowerCase().includes(searchTicket));
      
        if (String(this.data.content[i].Ticket).toLowerCase().includes(searchTicket)) {
          let temp = this.data.content[i];
          this.filterAlert.push(temp)
          console.log(this.filterAlert);
        }


        // if(this.data.content[i].Ticket==searchTicket){

        // }

      }
    }


    // const reas=this.etdValue.controls['reasons'].value
    // console.log(reas);

  }

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName = 'etd-account'
    this.etdservice.getdatafromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.data = JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log(this.data);
        console.log('done loading data');
        this.tableDatatest = this.data.content;
        console.log(this.tableDatatest);
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.etdcol;

        this.histableDatatest = this.data.historytab;
        this.hisDataSource.data = this.histableDatatest;
        this.hisColumnsToDisplay = this.data.historycol;
        this.myticketTabTableDatatest.push(this.data.mytickettab);
        this.myTicketDataSource.data = this.myticketTabTableDatatest;
        this.ticketColumnsToDisplay = this.data.myticketcol;

      }
    });
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


  returnZero() {
    return 0;
  }

  etdData() {
    console.log(this.etdValue.value);
  }

  reset() {
    this.etdValue.reset();
  }

  expand() {
    this.flag = !this.flag;
  }
}