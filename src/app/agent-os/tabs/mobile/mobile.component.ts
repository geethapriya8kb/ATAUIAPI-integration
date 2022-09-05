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
  dataTest: Array<string> = new Array<string>();;
  mobileDataSource = new MatTableDataSource<string>();
  mobileColumnsToDisplay: string[] = [];
  mobileDatatest: Array<string> = new Array<string>();
  historyDataSource = new MatTableDataSource<any>();
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

    const cardName = `mobile-existingcust`;

    this.mobileService.getdatafromAPI(accountNumber, cardName).subscribe(
      (resp) => {
        this.data = JSON.parse(resp.content);
             
      },
      (err: any) => console.error(err),
      () => {
        this.dataTest = this.data.mobileDeviceTable;
        console.log(this.dataTest);
        this.dataSource.data = this.dataTest;
        this.columnsToDisplay=this.data.orderStatusColumns;

        this.mobileDatatest = this.data.mobileOrderTable;
        console.log(this.mobileDatatest);
        this.mobileDataSource.data = this.mobileDatatest;
        this.mobileColumnsToDisplay=this.data.mobileOrderColumns;

        this.historyDataTest = this.data.mobileHistory;
        console.log(this.historyDataTest);
        this.historyDataSource.data = this.historyDataTest;
        this.historyColumnsToDisplay=this.data.mobileHistoryColumns;
      }
    );
  }
  public click(event: MouseEvent | KeyboardEvent, dialogValue: any, width: string,height:string,date:string): void {
console.log(date);

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
  getComponent(msg:any):any{
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
