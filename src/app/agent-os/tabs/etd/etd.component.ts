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
  datatest: any = {};

  dataSource = new MatTableDataSource<Array<string>>();
  columnsToDisplay:Array<string> = [];
  tableDatatest: any = [];
  hisdataSource = new MatTableDataSource<Array<string>>();
  hiscolumnsToDisplay:Array<string> = [];
  histableDatatest: any = [];
  myticketdataSource = new MatTableDataSource<Array<string>>();
  ticketcolumnsToDisplay:Array<string> = [];
  accountVal: unknown;
  etdvalue = new UntypedFormGroup({
    startdate: new UntypedFormControl(),
    enddate: new UntypedFormControl(),
    custtype: new UntypedFormControl(),
    reasons: new UntypedFormControl(),
    mgmtarea: new UntypedFormControl(),
    status: new UntypedFormControl(),
    form1: new UntypedFormControl()
  })

  constructor(private searchService: SearchService, private etdservice: EtdService
  ) { }

  ngOnInit(): void {
    this.etddata();
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
   this.etdservice.getdatafromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        debugger;
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
        console.log(this.tableDatatest);
        this.hisdataSource.data = this.histableDatatest;
        this.hiscolumnsToDisplay = this.data.historycol;

        this.tableDatatest = this.data.mytickettab;
        console.log(this.tableDatatest);
        this.myticketdataSource.data = this.tableDatatest;
        this.ticketcolumnsToDisplay = this.data.myticketcol;

      }
    });
  }

  returnZero() {
    return 0;
  }

  etddata() {
    console.log(this.etdvalue.value);
  }
}