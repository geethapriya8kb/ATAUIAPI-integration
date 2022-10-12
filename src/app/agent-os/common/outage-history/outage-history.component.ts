import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-outage-history',
  templateUrl: './outage-history.component.html',
  styleUrls: ['./outage-history.component.scss'],
})
export class OutageHistoryComponent implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  barChartLabels: Label[] = ['Call', 'Internet', 'Video', 'Voice'];
  barChartType: ChartType = 'horizontalBar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartColors: Color[] = [
    {
      backgroundColor: 'rgb(214, 49, 43)',
      borderColor: 'rgb(214, 49, 43)',
    },
  ];

  barChartData: ChartDataSets[] = [
    {
      data: [0, 60, 60, 60],
      label: 'Outage History',
      barPercentage: 0.6,
      barThickness: 8,
      maxBarThickness: 8,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
