import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { SharedService } from '../services/shared.service';
import { SearchService } from '../services/search.service';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-agent-os-main',
  templateUrl: './agent-os-main.component.html',
  styleUrls: ['./agent-os-main.component.scss']
})
export class AgentOsMainComponent implements OnInit {
  currentFlow = '';
  snackBarRef: any;

  menuItems: any;
  public selectedIdx!: number;
  showsidebar = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private http: HttpClient,
    private sharedService: SharedService,
    private searchService: SearchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer) {

    this.route.queryParams.subscribe(_ => {
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
    this.matIconRegistry
        .addSvgIcon('spectrum-logo', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/agent-os/spectrum-logo.svg'));

  }

  ngOnInit(): void {

    this.openSnackbar();

    this.http.get('assets/data/menu-items.json').subscribe((resp) => {
      const responseObj: any = resp;
      this.menuItems = responseObj['menu'];
      this.setSelectedIndex();
    });
  }

  ngAfterViewInit() {

  }

  ngOnDestroy(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  private openSnackbar(): void {
    this.snackBarRef = this.snackBar.open('Click on the Search button to proceed.', 'x', {
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  private setSelectedIndex(): void {
    debugger;
    let url = this.router.url === '/' ? '/dashboard' : this.router.url;
    this.selectedIdx = this.menuItems.indexOf(
      this.menuItems.find((tab: { link: string }) => tab.link === url)
    );
  }

  courseList() {
    const extras: NavigationExtras = {
      state: { flow: this.currentFlow }
    };
    this.router.navigate(['/aos'], extras);
  }
  menuName="Dashboard";
  handleFocusChange(event: MatTabChangeEvent): void {
    const menu = this.menuItems[event.index];
    this.menuName=menu.label;   
    this.router.navigate([menu.link],{state:{menudata:this.menuName}});
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
      value: this.showsidebar
    });
  }
}
