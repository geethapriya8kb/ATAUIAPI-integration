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
  data: any;
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
    search: new UntypedFormControl(),
  });
  tempdata: any;
  constructor(
    private searchService: SearchService,
    private etdservice: EtdService,
    private accountServ: AccountService
  ) {}

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
    this.filterAlert = [];
    const searchTicket = this.etdValue.value;
    let test: Array<TicketInformation> = [];
    if (searchTicket) {
      for (let i = 0; i < this.tempdata.content?.length; i++) {
        this.etdValue.controls['status'].value.forEach((element) => {
          if (
            String(this.tempdata.content[i].Status) === element ||
            String(this.tempdata.content[i].Ticket).toLowerCase().includes(searchTicket.search)
          ) {
            let temp = this.tempdata.content[i];
            test.push(temp);
          }
        });
      }
    }
    this.filterAlert = test;
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
        // console.log(this.etddata);
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
