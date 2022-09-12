import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatus } from '../../interfaces/OrderStatus';
import { SearchService } from '../../services/search.service';
import { GroupService } from '../../service-demo/group.service';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class OrderStatusComponent implements OnInit {
  status = [];
  selectedStatus: any = {};
  type = [];
  selectedType: any = {};
  task: [] = [];
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  expandedElement!: OrderStatus | null;
  data: any = {};
  accountVal: unknown;
  constructor(
    private searchService: SearchService,
    private groupservice:GroupService
  ) {}

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber);
  }
  statusChange(event: any): void {
    //console.log(this.selectedStatus);
  }
  typeChange(event: any): void {
    //console.log(this.selectedType);
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
    this.groupservice.getdatafromAPI(accountNumber,'order-status').subscribe(
      (resp) => {
        this.data= JSON.parse(resp.content)
      },
      (err) => console.error(err),
      () => {
        this.dataSource.data = this.data.orderStatusTable;
        this.columnsToDisplay = this.data.orderStatusColumns;
        this.status = this.data.status;
        this.type = this.data.type;
        this.task = this.data.tasks;
      }
    );
  }
  returnZero() {
    return 0;
  }
}
