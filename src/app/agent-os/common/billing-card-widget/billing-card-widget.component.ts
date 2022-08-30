import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import { UtilsService } from '../../services/utils.service';
import { GroupService } from '../../service-demo/group.service';

@Component({
  selector: 'app-billing-card-widget',
  templateUrl: './billing-card-widget.component.html',
  styleUrls: ['./billing-card-widget.component.scss'],
})
export class BillingCardWidgetComponent implements OnInit {
  data: any = [];
  billingwidget : any= [];
  @Input() cardName: string = '';
  accountVal;
  isSidebarOpen = true;

  constructor(
    private utils: UtilsService,
    private sharedService: SharedService,
    private searchService: SearchService,
    private groupservice:GroupService
  ) { }


  ngOnInit(): void {

    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getBillingCardWidgetData(this.accountVal);
      } else {
        this.getBillingCardWidgetData('');
      }
    });
    console.log(this.cardName);

    this.sharedService.sharedEvent.subscribe((event: any) => {
      if (event && event.type === 'sidebar-toggle') {
        this.isSidebarOpen = event.value;
      }
    });
  }
  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      this.accountVal = val;
      if (this.accountVal) {
        this.getBillingCardWidgetData(this.accountVal);
      } else {
        this.getBillingCardWidgetData('');
      }
    });
  }

  getBillingCardWidgetData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    this.groupservice.getdatafromAPI(accountNumber,this.cardName).subscribe({
      next: (resp) => {
        this.billingwidget = resp.content;
        this.data= JSON.parse(this.billingwidget)
      },
    });
  }
  }

