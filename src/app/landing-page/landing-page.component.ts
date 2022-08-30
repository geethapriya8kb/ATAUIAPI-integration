import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
 
})
export class LandingPageComponent implements OnInit {


  selectedApplication: any = null;

  applications = [{
    name: 'AGENT OS',
    flows: [
      { name: 'CALL REASON', route: '/aos', flow: 'call-reason' },
      { name: 'ORDERING', route: '/aos', flow: 'ordering' },
      { name: 'BILLING', route: '/aos', flow: 'billing' },
      { name: 'REPAIR', route: '/aos', flow: 'repair' },
      { name: 'LEGACY REPAIR', route: '/aos', flow: 'legacy-repair' },
      { name: 'MOBILE', route: '/aos', flow: 'mobile' }
    ]
  },
  {
    name: 'CREDIT CALC',
    flows: [
      { name: 'CALL REASON', route: '/cc/user' },
      { name: 'ORDERING', route: 'ordering' },
      { name: 'BILLING', route: 'billing' },
      { name: 'REPAIR', route: 'repair' },
      { name: 'LEGACY REPAIR', route: 'legacy-repair' },
      { name: 'MOBILE', route: 'mobile' }
    ]
  }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  selectApp(application: any) {
    this.selectedApplication = application;  
    
  }

  click(app: any): void {
    const extras: NavigationExtras = {
      state: { flow: app.flow }
    };

    this.router.navigate([app.route], extras);
  }
}
