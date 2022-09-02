import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { SearchService } from '../../services/search.service';
import { EtdResponse } from './etd.response';
import { EtdService } from './etd.service';

@Component({
  selector: 'app-etd',
  templateUrl: './etd.component.html',
  styleUrls: ['./etd.component.scss']
})
export class EtdComponent implements OnInit {

  data: EtdResponse;

  dataSource = new MatTableDataSource<Array<string>>();
  columnsToDisplay:Array<string> = [];
  tableDataTest: any = [];
  hisDataSource = new MatTableDataSource<Array<string>>();
  hisColumnsToDisplay:Array<string> = [];
  hisTableDataTest: any = [];
  myTicketDataSource = new MatTableDataSource<Array<string>>();
  ticketColumnsToDisplay:Array<string> = [];
  accountVal: unknown;
  etdValue = new UntypedFormGroup({
    startDate: new UntypedFormControl(),
    endDate: new UntypedFormControl(),
    custType: new UntypedFormControl(),
    reasons: new UntypedFormControl(),
    managmentArea: new UntypedFormControl(),
    status: new UntypedFormControl(),
    form1: new UntypedFormControl()
  })

  constructor(private searchService: SearchService, private etdService: EtdService
  ) { }

  ngOnInit(): void {
    this.etdData();
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

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
   let cardName='etd-account'
   this.etdService.getdatafromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.data = JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
      complete: () => {
        console.log(this.data);
        console.log('done loading data');
        this.tableDataTest = this.data.content;
        console.log(this.tableDataTest);
        this.dataSource.data = this.tableDataTest;
        this.columnsToDisplay = this.data.etdcol;

        this.hisTableDataTest = this.data.historytab;
        console.log(this.tableDataTest);
        this.hisDataSource.data = this.hisTableDataTest;
        this.hisColumnsToDisplay = this.data.historycol;

        this.tableDataTest = this.data.mytickettab;
        console.log(this.tableDataTest);
        this.myTicketDataSource.data = this.tableDataTest;
        this.ticketColumnsToDisplay = this.data.myticketcol;

      }
    });
  }

  returnZero() {
    return 0;
  }

  etdData() {
    console.log(this.etdValue.value);
  }
}