import { Component, OnInit, Input } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { MatTableDataSource } from '@angular/material/table';
import { CourseListService } from '../../services/course-list.service';
import { SearchService } from '../../services/search.service';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
@Component({
  selector: 'app-ordering',
  templateUrl: './ordering.component.html',
  styleUrls: ['./ordering.component.scss'],
})
export class OrderingComponent implements OnInit {
  panelOpenState = false;
  data: any = {};
  dataTest: any = {};
  
  dataSource = new MatTableDataSource<any>();
  expansionDataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  expColumnsToDisplay = [];
  tableDataTest: any = [];
  expTableDataTest: any = [];
  isOrderMove = false;
  accountVal: unknown;
  orderValue = new UntypedFormGroup({
    firstname: new UntypedFormControl(),
    lastname: new UntypedFormControl(),
    primaryPhone: new UntypedFormControl(),
    alternatePhone: new UntypedFormControl(),
  })
  constructor(
    private device: CardDataService,
    private courseListService: CourseListService,
    private searchService:SearchService
  ) {}

  ngOnInit(): void {
    // this.getContent();
    const label = this.courseListService.getHeader();
    if (label === 'Move/Transfer') {
      this.isOrderMove = true;
    }
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

    const path = `${accountNumber}/order-move`;

    this.device.getCardDatafromService(path).subscribe({
      next: (resp) => {
        this.data = resp;
        //
      },
      error: (err) => console.error(err),
      complete: () => {
        console.log(this.data);
        console.log('done loading data');
        this.tableDataTest = this.data.content;
        console.log(this.tableDataTest);
        this.dataSource.data = this.tableDataTest;
        this.columnsToDisplay = this.data.orderCol;

        this.expTableDataTest = this.data.expansionContent;
        console.log(this.tableDataTest);
        this.expansionDataSource.data = this.expTableDataTest;
        this.expColumnsToDisplay = this.data.expansionCol;
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
