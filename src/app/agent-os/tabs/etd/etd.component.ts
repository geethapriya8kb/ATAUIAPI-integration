import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-etd',
  templateUrl: './etd.component.html',
  styleUrls: ['./etd.component.scss']
})
export class EtdComponent implements OnInit {
  data: any = {};
  datatest: any = {};
  
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  tableDatatest: any = [];
  hisdataSource = new MatTableDataSource<any>();
  hiscolumnsToDisplay = [];
  histableDatatest: any = [];
  myticketdataSource = new MatTableDataSource<any>();
  ticketcolumnsToDisplay = [];
  accountVal: unknown;
  etdvalue = new UntypedFormGroup({
    startdate: new UntypedFormControl(),
    enddate: new UntypedFormControl(),
    custtype: new UntypedFormControl(),
    reasons: new UntypedFormControl(),
    mgmtarea: new UntypedFormControl(),
    status: new UntypedFormControl(),
    form1:new UntypedFormControl()
  })

  constructor(private cardDataService: CardDataService, private searchService: SearchService) { }

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

    const path = `${accountNumber}/etd-account`;

    this.cardDataService.getCardDatafromService(path).subscribe({
      next: (resp) => {
        this.data = resp;
       
      },
      error: (err) => console.error(err),
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