import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApplicationEnum } from 'src/app/models/setting-enum';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
import { DeviceManagementResponse, EventHistoryTable } from './device-management.response';
import { DeviceManagementService } from './device-management.service';
@Component({
  selector: 'app-device-management',
  templateUrl: './device-management.component.html',
  styleUrls: ['./device-management.component.scss']
})
export class DeviceManagementComponent implements OnInit {
  accountVal: unknown;
  styleVal: boolean;
  constructor(private cardDataService: CardDataService, private searchService: SearchService, private deviceManagementService: DeviceManagementService) { }
  dataSource = new MatTableDataSource<EventHistoryTable>();
  columnsToDisplay:Array<string>;
  tableDatatest:Array<EventHistoryTable>;
  data: DeviceManagementResponse;
  showData=false;
  ngOnInit(): void {  
    const accountNumber = this.searchService.getAccountNumber();
    this.getdatafromDeviceManagement(accountNumber);
  }
  ngAfterViewInit() {
   
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getdatafromDeviceManagement(this.accountVal);
      } else {
        this.getdatafromDeviceManagement('');
      }
    });
  }

  getdatafromDeviceManagement(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    this.styleVal = (accountNumber === 'empty') ? true : false;
    let cardName = "device-summary";
        this.deviceManagementService.getdatafromDeviceManagementAPI(accountNumber, cardName,Number(ApplicationEnum.AgentOs)).subscribe(
      (resp) => {
        this.data = resp.content;
      },
      (err) => console.error(err),
      () => {
        this.tableDatatest = this.data.eventHistoryTable;
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.eventHistoryColumns;
      }
    );
  }

  returnZero() {
    return 0;
  }
  
}
