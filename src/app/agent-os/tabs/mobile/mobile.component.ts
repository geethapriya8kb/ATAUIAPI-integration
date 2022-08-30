import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardDataService } from '../../services/card-data.service';
import { mobileDevices } from '../../interfaces/mobileDevices';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { SearchService } from '../../services/search.service';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MobileLearnMoreComponent } from '../../common/modals/mobile-learn-more/mobile-learn-more.component';
import { MobileViewMoreComponent } from '../../common/modals/mobile-view-more/mobile-view-more.component';
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
  data: any = {};
  
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  expandedElement!: mobileDevices | null;
  dataTest: any;
  mobileDataSource = new MatTableDataSource<any>();
  mobileColumnsToDisplay = [];
  mobileDatatest: any;
  historyDataSource = new MatTableDataSource<any>();
  historyColumnsToDisplay = [];
  historyDatatest: any;
  accountVal: unknown;
  activeIndex=0;
  matDa:any;


  constructor(private cardDataService:CardDataService,private searchService:SearchService
    ,private matDialog: MatDialog) { }

  ngOnInit(): void {
    // this.getCard();
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber); 
    console.log(this.matDa);
     
    
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

    const path = `${accountNumber}/mobile-existingcust`;

    this.cardDataService.getCardDatafromService(path).subscribe(
      (resp: any) => {
        this.data = resp;        
       
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

        this.historyDatatest = this.data.mobileHistory;
        console.log(this.historyDatatest);
        this.historyDataSource.data = this.historyDatatest;
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
