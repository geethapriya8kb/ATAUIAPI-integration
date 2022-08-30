import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  styleUrls: ['./device-card.component.scss']
})
export class DeviceCardComponent implements OnInit, AfterViewInit {

  @Input() sectionName: string = '';
  @Input() type: string = '';
  data: any = {};
  datatest: any = {};
  
  accountSearched = false;

  constructor(private searchService: SearchService,
    private cardDataService: CardDataService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

    var svgIcons = {
      'aos-tv-antenna': 'assets/images/agent-os/tv-with-antenna.svg',
      'aos-internet': 'assets/images/agent-os/internet.svg',
      'aos-telephone': 'assets/images/agent-os/telephone.svg',
      'aos-exclamation-hexagon': 'assets/images/agent-os/exclamation-hexagon.svg'
    };

    for (const iconName of Object.keys(svgIcons)) {
      const iconPath = svgIcons[iconName];

      this.matIconRegistry
        .addSvgIcon(iconName, this.domSanitizer.bypassSecurityTrustResourceUrl(iconPath));
    }
  }
menuName=history.state.menudata;
  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber);
  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      const accountNumber = val ? String(val) : '';

      this.getCardData(accountNumber);
    });
  }

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';
    const path = `${accountNumber}/${this.sectionName}`;

    this.accountSearched = accountNumber && accountNumber != 'empty';
    
    this.cardDataService.getCardDatafromService(path).subscribe({
      next: (resp) => {
        this.data = resp;             
       
      },
      error: (err) => console.log(err),
    });
  }

  returnZero() {
    return 0;
  }

}
