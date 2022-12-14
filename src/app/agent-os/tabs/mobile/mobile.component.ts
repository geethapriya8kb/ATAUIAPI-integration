import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { mobileDevices } from '../../interfaces/mobileDevices';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SearchService } from '../../services/search.service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MobileLearnMoreComponent } from '../../common/modals/mobile-learn-more/mobile-learn-more.component';
import { MobileViewMoreComponent } from '../../common/modals/mobile-view-more/mobile-view-more.component';
import { MobileService } from './mobile.service';
import { MobileResponse } from './mobile.response';
import { ApplicationEnum } from 'src/app/models/setting-enum';
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MobileComponent implements OnInit {
  data: MobileResponse;
  dataSource = new MatTableDataSource<string>();
  columnsToDisplay: string[] = [];
  expandedElement!: mobileDevices | null;
  dataTest: Array<string> = new Array<string>();accNum: any;
;
  mobileDataSource = new MatTableDataSource<string>();
  mobileColumnsToDisplay: string[] = [];
  mobileDatatest: Array<string> = new Array<string>();
  historyDataSource = new MatTableDataSource<string>();
  historyColumnsToDisplay: string[] = [];
  historyDataTest: Array<string> = new Array<string>();
  accountVal: unknown;
  activeIndex=0;


  constructor(private mobileService:MobileService,private searchService:SearchService
    ,private matDialog: MatDialog) { }

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.historyDataSource.filter = filterValue.trim().toLowerCase();
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
    this.accNum=accountNumber
    const cardName = `mobile-existingcust`;
    this.mobileService.getDataFromAPI(accountNumber, cardName,Number(ApplicationEnum.AgentOs)).subscribe(
      (resp) => {
        this.data = resp.content;
      },
      (err) => console.error(err),
      () => {
        this.dataTest = this.data?.mobileDeviceTable;
        this.dataSource.data = this.dataTest;
        this.columnsToDisplay=this.data.orderStatusColumns;

        this.mobileDatatest = this.data.mobileOrderTable;
        this.mobileDataSource.data = this.mobileDatatest;
        this.mobileColumnsToDisplay=this.data.mobileOrderColumns;

        this.historyDataTest = this.data.mobileHistory;
        this.historyDataSource.data = this.historyDataTest;
        this.historyColumnsToDisplay=this.data.mobileHistoryColumns;
      }
    );
  }
  public click(event: MouseEvent | KeyboardEvent, dialogValue: string, width: string,height:string,date:string): void {
    const el: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
    let dialogComponent: ComponentType<any>=this.getComponent(dialogValue);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name: date };
    dialogConfig.width = width;
    dialogConfig.height = height;
    let dialogRef = this.matDialog.open(dialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });
  }
  getComponent(msg:string):any{
    switch(msg) {
      case 'view': return MobileViewMoreComponent;
      case 'learn': return MobileLearnMoreComponent;  
    }
    return null;
  }
  
  returnZero() {
    return 0;
  }

}
