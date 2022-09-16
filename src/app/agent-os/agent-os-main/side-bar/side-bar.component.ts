import { Component, DoCheck, OnInit } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchDialogComponent } from '../../modals/search-dialog/search-dialog.component';
import { StickyNoteComponent } from '../../overlays/sticky-note/sticky-note.component';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import {
  ActionData,
  ArticleData,
  CoPilotUpdateData,
  HelpfulData,
  LinkData,
} from './side-bar.response';
import { SideBarService } from './side-bar.service';
import { StorageService } from '../../services/storage.service';
import { VerifyAuthentiacteComponent } from '../../common/verify-authentiacte/verify-authentiacte.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  helpfuldata: HelpfulData;
  linkdata: LinkData;
  actiondata: ActionData;
  copilotUpdateData: CoPilotUpdateData;
  articlesdata: ArticleData;
  searchflag = true;
  time=new Date();
  overlayRef: OverlayRef;

  custInfo = {   
  };
  sysTime: string;
  

  constructor(
    private matDialog: MatDialog,
    private cardDataService: CardDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private searchService: SearchService,
    private sharedService: SharedService,
    private overlay: Overlay,
    private sidebarservice: SideBarService,
    public storeService: StorageService
  ) {
    this.matIconRegistry
      .addSvgIcon(
        'aos-copy',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/images/agent-os/copy.svg'
        )
      )
      .addSvgIcon(
        'aos-last-results',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/images/agent-os/last-results.svg'
        )
      )
      .addSvgIcon(
        'aos-recently-viewed',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/images/agent-os/recently-viewed.svg'
        )
      )
      .addSvgIcon(
        'aos-search',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/images/agent-os/search-mark.svg'
        )
      )
      .addSvgIcon(
        'aos-close',
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          'assets/images/agent-os/close-mark.svg'
        )
      );
     
  }
  

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.loadData(accountNumber);
    this.sysTime=this.time.toLocaleString('en-US',{ timeStyle:'short', hour12: true });   
   
    this.custInfo = {
      'Account Number': '8429763145879632',
      'Biller': 'CHTR.CSG',
      'Service Address': this.storeService.location?.content?.second.Address.value,
      'Phone Number': '(314) 555-0101',
    
    }; 
    console.log(this.custInfo);
    
    
          
  }
  
  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      let accountNumber: string = val ? String(val) : '';
      this.loadData(accountNumber);
    });
    this.custInfo = {
      'Account Number': '8429763145879632',
      'Biller': 'CHTR.CSG',
      'Service Address': this.storeService.location?.content?.second.Address.value,
      'Phone Number': '(314) 555-0101',
    
    }; 
    console.log(this.custInfo);
  }

  private loadData(accountNumber: string): void {
    if (!accountNumber) {
      accountNumber = '';
    }
   
    this.getHelpfulLinks(accountNumber);
    this.getCopilotLinkData(accountNumber);
    this.getCopilotUpdateData(accountNumber);
    this.getArticles(accountNumber);
    this.getInterActionData(accountNumber);
  }

  openDialog() {
    const dialogConfig = {
      data: { name: 'some name' },
      width: '80%',
      height: '90%',
      screenLeft: 50,
      panelClass: 'search-dialog',
    };

    let dialogRef = this.matDialog.open(SearchDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);

      this.sharedService.sendData({
        type: 'search-dialog-close',
      });

      if (this.overlayRef) {
        this.overlayRef.dispose();
      }
    });

    this.sharedService.sendData({
      type: 'search-dialog-open',
    });

    const positionConfig = this.overlay.position().global().top().right();

    this.overlayRef = this.overlay.create({ positionStrategy: positionConfig });

    const componentPortal = new ComponentPortal(StickyNoteComponent);
    const componentRef = this.overlayRef.attach(componentPortal);

    componentRef.instance.closeSticky.subscribe(() => this.overlayRef.detach());
  }

  openVerifyDialog(){
    const dialogConfig = {
      minWidth: '95%',
      height: '90%',
    };

    const dialogRef = this.matDialog.open(VerifyAuthentiacteComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getHelpfulLinks(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `helpful-link`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.helpfuldata = JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
    });
  }

  getCopilotUpdateData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `copilot-updates`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => (this.copilotUpdateData = resp),
      error: (err) => console.error(err),
    });
  }

  getCopilotLinkData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `copilot-link`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {this.linkdata = JSON.parse(resp.content)},
      error: (err) => console.error(err),
    });
  }

  getInterActionData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `interaction-data`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => (this.actiondata = resp),
      error: (err) => console.error(err),
    });
  }

  getArticles(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `recommended-articles`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => {
        this.articlesdata = JSON.parse(resp.content);
    },
      error: (err) => console.error(err),
    });
  }

  clearData() {
    this.searchService.sharedValue$.next('');
    this.searchService.setAccountNumber('');
  }

  returnZero() {
    return 0;
  }
}
