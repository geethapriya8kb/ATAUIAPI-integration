import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { CourseListService } from '../services/course-list.service';
import { SearchService } from '../services/search.service';
import { SharedService } from '../services/shared.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-agent-os',
  templateUrl: './agent-os-landing.component.html',
  styleUrls: ['./agent-os-landing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AgentOsComponent implements OnInit {

  currentFlow = '';
  flowInfo: any = null;
  isCourseList = true;
  labelValue = '';
  constructor(
    private router: Router,
    private sharedService: SharedService,
    private courseListService: CourseListService,
    private storeService:StorageService,
    private searchService:SearchService) {
  
    this.isCourseList = true;

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.isCourseList = this.router.url === '/aos';
      }
    });

  }

  ngOnInit(): void {

    this.sharedService.sharedEvent.subscribe((event: any) => {

      if (event && event.type === 'open-flow') {
        const extras: NavigationExtras = {
          state: { option: event.option, flow: event.flow }
        };
        this.labelValue = event.option;
        this.currentFlow = event.flow;
        this.courseListService.saveHeader(this.currentFlow, this.labelValue);
        this.router.navigate(['/aos/main'], extras);
      }
    });
  }
  
  goback() {
    this.router.navigate(['/aos']);
    this.searchService.sharedValue$.next('empty');
    this.searchService.setAccountNumber('empty');
    this.storeService.location.next(this.storeService.locationEmpty);
  }
}
