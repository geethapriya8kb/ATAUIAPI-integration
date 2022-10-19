import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CourseListService } from '../../services/course-list.service';
import { SearchService } from '../../services/search.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { OrderingResponse } from './ordering.response';
import { OrderingService } from './ordering.service';
import { ApplicationEnum } from 'src/app/models/setting-enum';
@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.scss'],
})
export class OrderingComponent implements OnInit {
  panelOpenState = false;
  data: OrderingResponse;
  dataTest: Array<string> = new Array<string>();
  dataSource = new MatTableDataSource<string>();
  expansionDataSource = new MatTableDataSource<string>();
  columnsToDisplay: string[] = [];
  expColumnsToDisplay : string[] = [];
  tableDataTest: Array<string> = new Array<string>();
  expTableDataTest: Array<string> = new Array<string>();
  isOrderMove = false;
  accountVal: unknown;
  orderValue = new UntypedFormGroup({
    firstname: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    primaryPhone: new UntypedFormControl(),
    alternatePhone: new UntypedFormControl(),
  })
  constructor(
    private courseListService: CourseListService,
    private searchService:SearchService,
    private orderService:OrderingService
  ) {}

  ngOnInit(): void {
    const label = this.courseListService.getHeader();
    if (label === 'Move/Transfer'|| label==='Missing Channels') {
      this.isOrderMove = true;
    }
    const accountNumber = this.searchService.getAccountNumber();
 //   this.getCardData(accountNumber);  

  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
    //    this.getCardData(this.accountVal);
      } else {
        this.getCardData('');
      }
    });
  }
  
  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `order-move`;
    this. orderService.getDataFromAPI(accountNumber, cardName,Number(ApplicationEnum.AgentOs)).subscribe({
      next: (resp) => {
        this.data = resp.content;
      },
      error: (err) => console.error(err),
      complete: () => {
        
        this.tableDataTest = this.data.content;
        this.dataSource.data = this.tableDataTest;
        this.columnsToDisplay = this.data.ordercol;
        this.expTableDataTest = this.data.expansioncontent;
        this.expansionDataSource.data = this.expTableDataTest;
        this.expColumnsToDisplay = this.data.expansioncol;
      },
    });
  }
  
  returnZero() {
    return 0;
  }
  orderdata() {
    console.log(this.orderValue.value);
  }
}
