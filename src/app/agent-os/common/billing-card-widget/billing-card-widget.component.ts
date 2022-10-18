import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import { UtilsService } from '../../services/utils.service';
import { GroupService } from '../../service-demo/group.service';
import { StorageService } from '../../services/storage.service';
import { ApplicationEnum } from 'src/app/models/setting-enum';

@Component({
  selector: 'app-billing-card-widget',
  templateUrl: './billing-card-widget.component.html',
  styleUrls: ['./billing-card-widget.component.scss'],
})
export class BillingCardWidgetComponent implements OnInit {
  data: any = [];
  billingwidget: any = [];
  @Input() cardName: string = '';
  accountVal;
  isSidebarOpen = true;

  constructor(
    private utils: UtilsService,
    private sharedService: SharedService,
    private searchService: SearchService,
    private groupservice: GroupService,
    private storeService: StorageService
  ) {}

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    const billingWidgetAccount = this.storeService.billingWidgetAccount;
    if (billingWidgetAccount) {
      this.data = billingWidgetAccount;
    } else {
      this.getBillingCardWidgetData(accountNumber);
    }

    this.sharedService.sharedEvent.subscribe((event: any) => {
      if (event && event.type === 'sidebar-toggle') {
        this.isSidebarOpen = event.value;
      }
    });
  }
  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      const accountNumber = val ? String(val) : '';

      this.getBillingCardWidgetData(accountNumber);
    });
  }

  getBillingCardWidgetData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    this.groupservice.getdatafromAPI(accountNumber, this.cardName,Number(ApplicationEnum.AgentOs)).subscribe({
      next: (resp) => {
        this.billingwidget = resp.content;
        this.data = JSON.parse(this.billingwidget);
        this.storeService.billingWidgetAccount = this.data;
      },
    });
  }
}
