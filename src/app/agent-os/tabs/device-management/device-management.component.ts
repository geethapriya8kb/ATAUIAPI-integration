import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {
  accountVal: unknown; 
  styleVal:any={};
  constructor(private cardDataService:CardDataService,private searchService: SearchService) { }
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  tableDatatest: any = [];
  data: any = {};
  showData=false;
  ngOnInit(): void {  
    // this.getValuetoTable();
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
  getValuetoTable() {
    const dataFileName = `assets/data/8245100030092203/device-summary.json`;
    this.cardDataService.getCardData(dataFileName).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
        this.tableDatatest = this.data.eventHistoryTable;
        console.log(this.tableDatatest);
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.eventHistoryColumns;
      }
    );
  }
  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';

    const path = `${accountNumber}/device-summary`;
    if(accountNumber==='empty'){
      this.styleVal=true
     }else{
      this.styleVal=false
     }
    this.cardDataService.getCardDatafromService(path).subscribe(
      (resp) => {
        this.data = resp;
      },
      (err) => console.error(err),
      () => {
        this.tableDatatest = this.data.eventHistoryTable;
        console.log(this.tableDatatest);
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.eventHistoryColumns;
      }
    );
  }

  returnZero() {
    return 0;
  }
  
}
