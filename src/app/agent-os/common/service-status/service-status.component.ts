import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from '../../service-demo/group.service';
import { SearchService } from '../../services/search.service';
@Component({
  selector: 'app-service-status',
  templateUrl: './service-status.component.html',
  styleUrls: ['./service-status.component.scss']
})
export class ServiceStatusComponent implements OnInit {
  types: any = [];
  service: any = [];
  data: any = {};
  accountVal: any;

  constructor(
    private groupservice:GroupService,
    private searchService: SearchService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

      this.matIconRegistry
      .addSvgIcon('aos-copy-blue', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/agent-os/copy-blue.svg'))
      .addSvgIcon('aos-check-mark', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/agent-os/check-mark.svg'));
  }

  ngOnInit(): void {
    const accountNumber = this.searchService.getAccountNumber();
    this.getCardData(accountNumber);

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

    this.groupservice.getdatafromAPI(accountNumber,'service-status').subscribe(
      (resp) => {
        this.data= JSON.parse(resp.content)
      },
      (err) => console.error(err),
      () => {
        this.data.channel.forEach((element: {}) => {
          this.types = Object.keys(element);
        });
        this.data.serviceDetails.forEach((element: {}) => {
          this.service = Object.keys(element);
          this.service.splice(this.service.indexOf('Mbps'), 1)
        });
      }
    )
  }
}