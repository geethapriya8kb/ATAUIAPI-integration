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
  styleUrls: ['./etd.component.scss'],
})
export class EtdComponent implements OnInit {
  flag: boolean = false;
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
  filterAlert: Array<TicketInformation> = [];
  etdValue = new UntypedFormGroup({
    startDate: new UntypedFormControl(),
    endDate: new UntypedFormControl(),
    custType: new UntypedFormControl(),
    reasons: new UntypedFormControl(),
    managmentArea: new UntypedFormControl(),
    status: new UntypedFormControl(),
    search: new UntypedFormControl(),
  });
  tempdata: any;
  data: any;
  etddata: any;
  query: any;
  public searchFilter: any = '';
  constructor(
    private searchService: SearchService,
    private etdservice: EtdService,
    private accountServ: AccountService
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
    // let test: Array<TicketInformation> = [];
    // if (searchTicket) {
    //   for (let i = 0; i < this.tempdata.content?.length; i++) {
    //     this.etdValue.controls['status'].value.forEach((element) => {
    //       if (
    //         String(this.tempdata.content[i].Status) === element ||
    //         String(this.tempdata.content[i].Ticket).toLowerCase().includes(searchTicket.search)
    //       ) {
    //         let temp = this.tempdata.content[i];
    //         test.push(temp);
    //         console.log(test);

    //       }
    //     });
    //   }
    // }
    // this.filterAlert = test;
    // console.log(this.filterAlert);
    if (searchTicket) {
      this.filterAlert = [];
      
      for (let i = 0; i < this.tempdata.content?.length; i++) {
        let customer= this.etdValue.controls['custType'].value.toString().charAt(0);
        if (
          ((!this.etdValue.controls['search'].value) ||
            (String(this.tempdata.content[i].Ticket).toLowerCase().includes(searchTicket.search) ||
              String(this.tempdata.content[i].Account).toLowerCase().includes(searchTicket.search))) &&
          ((!this.etdValue.controls['status'].value) ||
            this.etdValue.controls['status'].value.includes(String(this.tempdata.content[i].Status))) &&
          ((!this.etdValue.controls['reasons'].value) ||
            this.etdValue.controls['reasons'].value.includes(String(this.tempdata.content[i].Reason))) &&
          ((!this.etdValue.controls['custType'].value) ||
          customer.includes(String(this.tempdata.content[i]['Cust Type']))) &&
          ((!this.etdValue.controls['managmentArea'].value) ||
          this.etdValue.controls['managmentArea'].value.includes(String(this.tempdata.content[i].City)))
        ) {
          let temp = this.tempdata.content[i];
          this.filterAlert.push(temp);
        }
      }
    }
    console.log(this.filterAlert);
  }

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName = 'etd-account';
    this.etdservice.getdatafromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.data = JSON.parse(resp.content);
        this.tempdata = this.data;
      },
      error: (err) => console.log(err),
      complete: () => {
        this.tableDatatest = this.data.content;
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.etdcol;
        this.histableDatatest = this.data.historytab;
        this.hisDataSource.data = this.histableDatatest;
        this.hisColumnsToDisplay = this.data.historycol;
        this.myticketTabTableDatatest.push(this.data.mytickettab);
        this.myTicketDataSource.data = this.myticketTabTableDatatest;
        this.ticketColumnsToDisplay = this.data.myticketcol;
      },
    });
  }

  etdDropData() {
    const dataFileName = `assets/data/etd-table.json`;
    this.accountServ.getverifydata(dataFileName).subscribe(
      (resp) => {
        this.etddata = resp;
      },
      (err) => console.error(err),
      () => {
        
      }
    );
  }

  returnZero() {
    return 0;
  }

  etdData() {
    // console.log(this.etdValue.value);
  }

  reset() {
    this.etdValue.reset();
  }

  expand() {
    this.flag = !this.flag;
  }

}
