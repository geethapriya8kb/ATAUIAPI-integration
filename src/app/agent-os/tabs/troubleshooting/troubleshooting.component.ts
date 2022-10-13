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
import { TroubleShootingService } from './troubleshooting.service';
import { EventAlertsData } from './alert.response';
import { EventHistory, EventHistoryTable } from './eventHistory.response';
import { HistoryTable,HistoryResponse } from './history.response';
import { Symptoms } from './symptoms.response';
import { Internet, Video } from './tsissues.response';
import { HitHistoryResponse,History } from './hithistory.response';

@Component({
  selector: 'app-troubleshooting',
  templateUrl: './troubleshooting.component.html',
  styleUrls: ['./troubleshooting.component.scss'],
})
export class TroubleshootingComponent implements OnInit {
  dataSource = new MatTableDataSource<EventHistoryTable>();
  columnsToDisplay: Array<string>;
  data: EventHistory;

  //eventAlertsData: Array<EventAlertsData>;
  eventAlertsData: EventAlertsData;
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild('sBSort') sBSort: MatSort;

  dataSourceHit = new MatTableDataSource<History>();
  hitColumnsToDisplay:Array<string>;
  hitData: HitHistoryResponse;

  dataSourceTs = new MatTableDataSource<HistoryTable>();
  columnsToDisplayTs :Array<string>;
  tsHistoryData: HistoryResponse;

  symptomsData: Symptoms;
  active = 0;

  videoIssuesData: Array<Video>;
  internetIssuesData: Array<Internet>;
  videoHome: boolean = false;
  symptomName: string;
  dynamicTabName: string;
  // Same issuesData use for  videoIssuesData and internetIssuesData
  issuesData: any = {};

  isMousehover: Number = 0;

  radioSelected: any;
  constructor(
    private troubleshootingService: CardDataService,
    private matDialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService,
    private troubleShootService:TroubleShootingService
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
    let cardName="troubleshooting-alerts"
    this.troubleShootService.getdatafromAlertResponseAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.eventAlertsData = JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
      complete: () => {  }
    });
  }

  getValuetoTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName="ts-event-history"
    this.troubleShootService.getdatafromEventHistoryAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.data  = JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
      complete: () => {
        this.dataSource.data = this.data.eventHistoryTable;
        this.columnsToDisplay = this.data.eventHistoryColumns;
       }
    });
  }

   getValuetoHitTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName="hit-history"
    this.troubleShootService.getdatafromHitHistoryAPI(accountNumber,cardName).subscribe({
      next: (resp) => (this.hitData =  JSON.parse(resp.content)),
      error: (err) => console.error(err),
      complete: () => {
        this.dataSourceHit.data = this.hitData.hithistory;
        this.hitColumnsToDisplay = this.hitData.hitHistoryColumn;
      },
    });
  }

  getValuetoTShistoryTable(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
       let cardName="troubleshooting-history"
     this.troubleShootService.getdatafromHistoryAPI(accountNumber,cardName).subscribe({
      next: (resp) => (this.tsHistoryData = JSON.parse(resp.content)),
      error: (err) => console.error(err),
      complete: () => {
        this.dataSourceTs.data = this.tsHistoryData.eventHistoryTable;
        this.columnsToDisplayTs = this.tsHistoryData.eventHistoryColumns;
      },
    });
  }

  getSymptomsData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName="symptoms"
    this.troubleShootService.getDataFromSymptomsAPI(accountNumber,cardName).subscribe({
      next: (resp) => (this.symptomsData = JSON.parse(resp.content)),
      error: (err) => console.error(err),
      complete: () => {
       
      },
    });
  }

  getvideoIssuesData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    let cardName="ts-issues"
    this.troubleShootService.getDataFromTsIssuesAPI(accountNumber,cardName).subscribe({
      next: (resp) => {
        let content= JSON.parse(resp.content)
        this.videoIssuesData = content.video;
        this.internetIssuesData = content.internet;
      },
      error: (err) => console.error(err),
      complete: () => {
       
      },
    });
  }

  onTabChange(e: any) {
 
  }

  public demo2BtnClick(tabGroup: MatTabGroup, symptomName, dynamicTabName, event) {
    if (event.type === 'click' || this.isMousehover == 0) {
      if (dynamicTabName === 'Video') {
        this.dynamicTabName = dynamicTabName;
        this.symptomName = symptomName;
        this.issuesData = this.videoIssuesData[0].content;

        this.videoHome = Object.keys(this.videoIssuesData[0].content).some(
          (key) => key.includes(symptomName)
        );
        this.goToNextTabIndex(tabGroup);
      }
      if (dynamicTabName === 'Internet') {
        this.dynamicTabName = dynamicTabName;
        this.symptomName = symptomName;
        this.issuesData = this.internetIssuesData[0].content;

        this.videoHome = Object.keys(this.issuesData).some((key) =>
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
   //this.radioSelected
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
    let type='override automation';
  }

  rerun() {
    let type='rerun automation';
  }
  openEventDetails() {
    const dialogConfig = {
      data: { name: 'some name' },
      width: '70%',
      height: '90%',
      screenLeft: 50,
      panelClass: 'search-dialog',
    };

    let dialogRef = this.matDialog.open(EventDetailsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
   
    });
  }
}
