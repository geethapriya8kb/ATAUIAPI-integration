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
import { ThisReceiver } from '@angular/compiler';

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
  searchflag:boolean;
  time=new Date();
  overlayRef: OverlayRef;

  custInfo = {   
  };
  sysTime: string;
  locationVal: any;
  

  constructor(
    private matDialog: MatDialog,
    private cardDataService: CardDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public searchService: SearchService,
    private sharedService: SharedService,
    private overlay: Overlay,
    private sidebarservice: SideBarService,
    public storeService: StorageService
  ) {  
      
      var svgIcons = {
        'aos-copy': 'assets/images/agent-os/copy.svg',
        'aos-last-results':'assets/images/agent-os/last-results.svg',
        'aos-recently-viewed':'assets/images/agent-os/recently-viewed.svg',
        'aos-search': 'assets/images/agent-os/search-mark.svg',
        'aos-close': 'assets/images/agent-os/close-mark.svg',
        'aos-info':'assets/images/agent-os/info-circle.svg',
        'aos-copy-dark':'assets/images/agent-os/copy-dark.svg'
      };
      for (const iconName of Object.keys(svgIcons)) {          
        const iconPath = svgIcons[iconName];  
        this.matIconRegistry
          .addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
      }
  }
  

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.loadData(accountNumber);
    this.sysTime=this.time.toLocaleString('en-US',{ timeStyle:'short', hour12: true }); 
    this.storeService.location.subscribe((val: any) => {
      this.locationVal=val;
      this.custInfo = {
        'Account Number': this.searchService.getAccountNumber(),
        'Biller': 'CHTR.CSG',
        'Service Address': val.content?.second.Address.value,
        'Phone Number': val.contact.phone.value1,
      
      }; 
    }); 
  }
  
  ngAfterViewInit() {
 
    this.searchService.sharedValue$.subscribe((val) => {
      const accountNumber = val ? String(val) : '';
      this.loadData(accountNumber);
    });
  }

   loadData(accountNumber: string): void {
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
      // console.log(`Dialog sent: ${value}`);

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
     
    });
  }

  getHelpfulLinks(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `helpful-link`;
    if(accountNumber!='empty'){
      this.searchflag=true
    }else{
      this.searchflag=false
    }
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
      next: (resp) => (this.actiondata = JSON.parse(resp.content)),    
      
      error: (err) => console.error(err),
    });
  }

  getArticles(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const cardName = `recommended-articles`;
    this.sidebarservice.getDataFromAPI(accountNumber, cardName).subscribe({
      next: (resp) => (this.articlesdata = JSON.parse(resp.content)),
      error: (err) => console.error(err),
    });
  }

  clearData() {
    this.searchService.sharedValue$.next('empty');
    this.searchService.setAccountNumber('empty');
    this.storeService.location.next(this.storeService.locationEmpty);
    this.storeService.customer=null
    this.storeService.editAccount=null
  }

  returnZero() {
    return 0;
  }
 
}
