import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SharedService } from '../services/shared.service';
import { SearchService } from '../services/search.service';
import { MatIconRegistry } from '@angular/material/icon';
import { AgentOsFlowsService } from '../services/agent-os-flows.service';
import { CourseListService } from '../services/course-list.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-agent-os-main',
  templateUrl: './agent-os-main.component.html',
  styleUrls: ['./agent-os-main.component.scss'],
})
export class AgentOsMainComponent implements OnInit {
  currentFlow = '';
  snackBarRef: any;

  menuItems: any;
  public selectedIdx!: number;
  showsidebar = true;
  currentCourse = '';
  flowList: any = null;
  accountNumbers: any[];
  isTroubleShoot: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private http: HttpClient,
    private sharedService: SharedService,
    private searchService: SearchService,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private courseListService: CourseListService,
    private flowService: AgentOsFlowsService,
    private storeService: StorageService,
  ) {
    this.route.queryParams.subscribe((_) => {
      const navExtras = this.router.getCurrentNavigation();
      if (navExtras?.extras?.state) {
        const option = navExtras.extras.state['option'] || 'ordering';
        this.currentFlow = navExtras.extras.state['flow'] || 'ordering';

        console.log(this.currentFlow);
      }
    });

    this.sharedService.sharedEvent.subscribe((event: any) => {
      if (event && event.type === 'search-dialog-open') {
        this.snackBar.dismiss();
      } else if (event && event.type === 'search-dialog-close') {
        this.openSnackbar();
      }
    });
    this.matIconRegistry.addSvgIcon(
      'spectrum-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/agent-os/spectrum-logo.svg'
      )
    );
  }

  ngOnInit(): void {
    const label = this.courseListService.getData();
    this.currentCourse = label ? label : '';
    this.flowList = this.flowService.getFlowInfo(this.currentCourse);
    let courseType = this.courseListService.getHeader();
    if (this.currentCourse === 'call-reason') {
      for (let i = 0; i < this.flowList.groups.length; i++) {
        this.flowList.groups[i]?.options.forEach((element) => {
          if (element.name === courseType) {
            this.accountNumbers = element.accountList;
          }
        });
      }
    } else {
      let index = this.flowList.groups[0].options.indexOf(
        this.flowList.groups[0].options.find(
          (item: { name: string }) => item.name === courseType
        )
      );
      if(this.flowList.groups[0].istroubleshooting!==undefined)
      this.isTroubleShoot=Boolean(this.flowList.groups[0].istroubleshooting);
      
      this.accountNumbers = this.flowList.groups[0].options[index].accountList;
    }
    this.storeService.courseListAccounts= this.accountNumbers;
    console.log(this.storeService.courseListAccounts);
    this.openSnackbar();

    this.http.get('assets/data/menu-items.json').subscribe((resp) => {
      const responseObj: any = resp;
      this.menuItems = responseObj['menu'];
      this.setSelectedIndex();
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  private openSnackbar(): void {
    this.snackBarRef = this.snackBar.open(
      'Click on the Search button to proceed.',
      'x',
      {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      }
    );
  }

  private setSelectedIndex(): void {
    let url = this.router.url === '/' ? '/dashboard' : this.router.url;
    this.selectedIdx = this.menuItems.indexOf(
      this.menuItems.find((tab: { link: string }) => tab.link === url)
    );
  }

  courseList() {
    const extras: NavigationExtras = {
      state: { flow: this.currentFlow },
    };
    this.router.navigate(['/aos'], extras);
  }
  menuName = 'Dashboard';
  handleFocusChange(event: MatTabChangeEvent): void {
    const menu = this.menuItems[event.index];
    this.menuName = menu.label;
    this.router.navigate([menu.link], { state: { menudata: this.menuName } });
  }

  goBackToHomePage() {
    this.router.navigate(['/home']);
  }

  goBackToPrevPage(): void {
    this.router.navigate(['/ordering-home']);
  }

  toggleSidebar() {
    this.showsidebar = !this.showsidebar;

    this.sharedService.sendData({
      type: 'sidebar-toggle',
      value: this.showsidebar,
    });
  }
}
