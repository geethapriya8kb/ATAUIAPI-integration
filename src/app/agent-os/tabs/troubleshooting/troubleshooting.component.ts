import { Component, OnInit, ViewChild } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchService } from '../../services/search.service';
import { EventDetailsComponent } from '../../modals/event-details/event-details.component';

@Component({
  selector: 'app-troubleshooting',
  templateUrl: './troubleshooting.component.html',
  styleUrls: ['./troubleshooting.component.scss'],
})
export class TroubleshootingComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  columnsToDisplay = [];
  tableDatatest: any = [];
  eventAlertsData: any = {};
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('sBSort') sBSort: MatSort;
  data: any = {};

  dataSourceHit = new MatTableDataSource<any>();
  HitcolumnsToDisplay = [];
  hitdata: any = {};

  dataSourceTs = new MatTableDataSource<any>();
  columnsToDisplayTs = [];
  tsHistoryData: any = {};

  symptomsData: any = {};
  active = 0;

  videoIssuesData: any = {};
  internetIssuesData: any = {};
  videohome: boolean = false;
  symptomName: any;
  TabName: any;
  issuesData: any = {};

  isMousehover: Number = 0;

  radioSelected: any;
  constructor(
    private troubleshootingService: CardDataService,
    private matDialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService
  ) {
    this.dataSourceTs.data = [];
    const icons = {
      'aos-internet': 'assets/images/agent-os/internet.svg',
      'aos-telephone': 'assets/images/agent-os/telephone.svg',
      'aos-tv': 'assets/images/agent-os/tv-with-antenna.svg',
    };

    for (const iconName of Object.keys(icons)) {
      const iconPath = icons[iconName];

      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath)
      );
    }
  }

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getAlertsData(accountNumber);
    this.getValuetoTable(accountNumber);
    this.getValuetoHitTable(accountNumber);
    this.getValuetoTShistoryTable(accountNumber);
    this.getSymptomsData(accountNumber);
    this.getvideoIssuesData(accountNumber);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSourceHit.sort = this.sBSort;
    this.dataSourceTs.sort = this.sort;

    this.searchService.sharedValue$.subscribe((val: any) => {
      const accountNumber = val ? String(val) : '';

      this.getAlertsData(accountNumber);
      this.getSymptomsData(accountNumber);
      this.getValuetoTable(accountNumber);
      this.getValuetoHitTable(accountNumber);
      this.getValuetoTShistoryTable(accountNumber);
      this.getvideoIssuesData(accountNumber);
    });
  }

  getAlertsData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/troubleshooting-alerts`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp) => (this.eventAlertsData = resp),
      error: (err) => console.error(err),
    });
  }

  getValuetoTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/ts-event-history`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp) => (this.data = resp),
      error: (err) => console.error(err),
      complete: () => {
        this.tableDatatest = this.data.eventHistoryTable;
        this.dataSource.data = this.tableDatatest;
        this.columnsToDisplay = this.data.eventHistoryColumns;
      },
    });
  }

  getValuetoHitTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/hit-history`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp) => (this.hitdata = resp),
      error: (err) => console.error(err),
      complete: () => {
        this.dataSourceHit.data = this.hitdata.hithistory;
        this.HitcolumnsToDisplay = this.hitdata.hitHistoryColumn;
      },
    });
  }

  getValuetoTShistoryTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/troubleshooting-history`;
    // const dataFileName = `assets/data/troubleshooting-history.json`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp) => (this.tsHistoryData = resp),
      error: (err) => console.error(err),
      complete: () => {
        this.dataSourceTs.data = this.tsHistoryData.eventHistoryTable;
        this.columnsToDisplayTs = this.tsHistoryData.eventHistoryColumns;
      },
    });
  }

  getSymptomsData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/symptoms`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp: any) => (this.symptomsData = resp),
      error: (err: any) => console.error(err),
      complete: () => {
        console.log(this.symptomsData);
      },
    });
  }

  getvideoIssuesData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/ts-issues`;
   // const dataFileName = `assets/data/ts-issues.json`;
    this.troubleshootingService.getCardDatafromService(path).subscribe({
      next: (resp: any) => {
        this.videoIssuesData = resp.video;
        this.internetIssuesData = resp.internet;
      },
      error: (err: any) => console.error(err),
      complete: () => {
        console.log(this.videoIssuesData);
        console.log(this.internetIssuesData);
      },
    });
  }

  onTabChange(e: any) {
    console.log(e);
  }

  public demo2BtnClick(tabGroup: MatTabGroup, symptomName, TabName, event) {
    if (event.type === 'click' || this.isMousehover == 0) {
      console.log(event.type === 'mouseover');
      console.log(TabName, symptomName);
      if (TabName === 'Video') {
        this.TabName = TabName;
        this.symptomName = symptomName;
        this.issuesData = this.videoIssuesData[0].content;

        this.videohome = Object.keys(this.videoIssuesData[0].content).some(
          (key) => key.includes(symptomName)
        );
        this.goToNextTabIndex(tabGroup);
      }
      if (TabName === 'Internet') {
        this.TabName = TabName;
        this.symptomName = symptomName;
        this.issuesData = this.internetIssuesData[0].content;

        this.videohome = Object.keys(this.issuesData).some((key) =>
          key.includes(symptomName)
        );
        this.goToNextTabIndex(tabGroup);
      }
    }
    if (event.type === 'mouseover' && this.isMousehover == 0) {
      this.isMousehover = 1;
    }
  }

  private goToNextTabIndex(tabGroup?: MatTabGroup) {
    if (!tabGroup || !(tabGroup instanceof MatTabGroup)) return;
    const tabCount = tabGroup._tabs.length;
    tabGroup.selectedIndex = tabCount - 1;
    // tabGroup.selectedIndex = (tabGroup.selectedIndex! + 1) % tabCount;
  }

  radioFun() {
    console.log(this.radioSelected);
  }

  returnZero() {
    return 0;
  }

  callAction(actionName: string) {
    switch (actionName) {
      case 'override':
        return this.override();
      case 'rerun':
        return this.rerun();
    }
  }

  override() {
    console.log('override automation');
  }

  rerun() {
    console.log('rerun automation');
  }
  openEventDetails() {
    const dialogConfig = {
      data: { name: 'some name' },
      width: '80%',
      height: '90%',
      screenLeft: 50,
      panelClass: 'search-dialog',
    };

    let dialogRef = this.matDialog.open(EventDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });
  }
}
