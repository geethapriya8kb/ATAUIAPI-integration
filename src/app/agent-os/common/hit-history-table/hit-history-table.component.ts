import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-hit-history-table',
  templateUrl: './hit-history-table.component.html',
  styleUrls: ['./hit-history-table.component.scss']
})
export class HitHistoryTableComponent implements OnInit,AfterViewInit {

  dataSource = new MatTableDataSource<any>();
  dataSourcePro = new MatTableDataSource<any>();
  columnsToDisplay = [];
  tableDatatest: any = [];
  tableDatatestpro: any = [];
  data: any = {};
  @ViewChild(MatSort)
  sort!: MatSort;
  accountVal: any;
  
  constructor(private cardDataService: CardDataService,private searchService: SearchService) { }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSourcePro.sort = this.sort;
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;

      this.getCardData(this.accountVal);
    });
  }

  ngOnInit(): void {
    
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber);
  }
  // getValuetoTable() {
  //   const dataFileName = `assets/data/callreason-historytable.json`;
  //   this.cardDataService.getCardData(dataFileName).subscribe(
  //     (resp) => {
  //       this.data = resp;
  //     },
  //     (err) => console.error(err),
  //     () => {
  //       this.tableDatatest = this.data.hithistory;
  //       
  //       this.dataSource.data = this.tableDatatest;
  //       this.tableDatatestpro = this.data.provisionhistory;
  //       console.log(this.tableDatatestpro);
  //       this.dataSourcePro.data = this.tableDatatestpro;
  //       this.columnsToDisplay = this.data.hitHistoryColumn;
  //     }
  //   );
  // }
  getCardData(accountNumber) {

    const path = `${accountNumber}/hit-history`;
   
    this.cardDataService.getCardDatafromService(path).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
        this.tableDatatest = this.data.hithistory;
        this.dataSource.data = this.tableDatatest;
        this.tableDatatestpro = this.data.provisionhistory;
        this.dataSourcePro.data = this.tableDatatestpro;
        this.columnsToDisplay = this.data.hitHistoryColumn;
      }
    );
  }
}


