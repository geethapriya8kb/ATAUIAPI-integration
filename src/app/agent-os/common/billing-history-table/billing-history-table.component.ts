import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CardDataService } from '../../services/card-data.service';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-billing-history-table',
  templateUrl: './billing-history-table.component.html',
  styleUrls: ['./billing-history-table.component.scss']
})
export class BillingHistoryTableComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };
  barChartLabels: Label[] = ['Dec 5', 'Jan 5', 'Feb 5', 'March 5', 'Apri 5', 'May 5'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    {
      backgroundColor: '#0073d1',
      borderColor: '#0073d1',
    }
  ];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Billing History Trend' }
  ];
  accountVal: unknown;



  constructor(private device: CardDataService, private searchService: SearchService) { }
  data: any = {};
  
  billingDataSource = new MatTableDataSource<any>();
  billingColumnsToDisplay = [];
  billingDatatest: any = [];
  eventDataSource = new MatTableDataSource<any>();
  eventColumnsToDisplay = [];
  eventDatatest: any = [];
  showchart!: boolean;


  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber);
  }


  view() {
    this.showchart = !this.showchart;
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

    const path = `${accountNumber}/call-reason`;

    this.device.getCardDatafromService(path)
      .subscribe({
        next: (resp: any) => {
          this.data = resp;
         
        },
        error: (err: any) => console.error(err),
        complete: () => {
          this.billingDatatest = this.data.billingHistoryData;
          console.log(this.billingDatatest);
          this.billingDataSource.data = this.billingDatatest;
          this.billingColumnsToDisplay = this.data.billingHistoryColumns;

          this.eventDatatest = this.data.eventsHistory;
          console.log(this.eventDatatest);
          this.eventDataSource.data = this.eventDatatest;
          this.eventColumnsToDisplay = this.data.eventHistoryColumns;
        }
      });
  }


  returnZero = () => 0;
}
