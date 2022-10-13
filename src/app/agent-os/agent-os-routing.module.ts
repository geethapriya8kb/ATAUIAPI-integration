import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentOsComponent } from './agent-os-landing/agent-os-landing.component';
import { CourseListComponent } from './course-list/course-list.component';
import { AgentOsMainComponent } from './agent-os-main/agent-os-main.component';
import { DashboardComponent } from './tabs/dashboard/dashboard.component';
import { CallReasonComponent } from './tabs/call-reason/call-reason.component';
import { FieldOperationsComponent } from './tabs/field-operations/field-operations.component';
import { EtdComponent } from './tabs/etd/etd.component';
import { BillingComponent } from './tabs/billing/billing.component';
import { DeviceManagementComponent } from './tabs/device-management/device-management.component';
import { OrderingComponent } from './tabs/ordering/ordering.component';
import { TroubleshootingComponent } from './tabs/troubleshooting/troubleshooting.component';
import { MobileComponent } from './tabs/mobile/mobile.component';
import { ToolsComponent } from './tabs/tools/tools.component';
import { EtdWorkTicketComponent } from './common/etd-work-ticket/etd-work-ticket.component';
import { VerifyAuthentiacteComponent } from './common/verify-authentiacte/verify-authentiacte.component';
import { AgingAmountComponent } from './common/aging-amount/aging-amount.component';
import { AuthGuardService } from './services/auth-guard.service';



const routes: Routes = [
    {
        path: '',
        component: AgentOsComponent,
        children: [
            { path: '', component: CourseListComponent },
            {
                path: 'main',
                component: AgentOsMainComponent,
                children: [
                    { path: 'call-reason', component: CallReasonComponent },
                    { path: 'dashboard', component: DashboardComponent },
                    { path: 'field-operations', component: FieldOperationsComponent },
                    { path: 'etd', component: EtdComponent },
                    { path: 'billing', component: BillingComponent },
                    { path: 'device-management', component: DeviceManagementComponent },
                    { path: 'ordering', component: OrderingComponent },
                    { path: 'troubleshooting', component: TroubleshootingComponent, canActivate : [AuthGuardService]  },
                    { path: 'mobile', component: MobileComponent },
                    { path: 'tools', component: ToolsComponent },
                    { path: 'etd/work-ticket', component: EtdWorkTicketComponent },
                    { path: 'verify', component: VerifyAuthentiacteComponent },
                    { path: 'aging', component: AgingAmountComponent},
                    { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AgentOsRoutingModule { }
