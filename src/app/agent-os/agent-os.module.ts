import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { AgentOsRoutingModule } from './agent-os-routing.module';
import { AgentOsFlowsService } from './services/agent-os-flows.service';
import { AgentOsComponent } from './agent-os-landing/agent-os-landing.component';
import { CourseListComponent } from './course-list/course-list.component';
import { SharedService } from './services/shared.service';
import { AgentOsMainComponent } from './agent-os-main/agent-os-main.component';
import { HttpClientModule } from '@angular/common/http';
import { SideBarComponent } from './agent-os-main/side-bar/side-bar.component';
import { SearchDialogComponent } from './modals/search-dialog/search-dialog.component';
import { DataCardComponent } from './common/data-card/data-card.component';
import { CardDataService } from './services/card-data.service';
import { DashboardComponent } from './tabs//dashboard/dashboard.component';
import { CallReasonComponent } from './tabs//call-reason/call-reason.component';
import { FieldOperationsComponent } from './tabs//field-operations/field-operations.component';
import { EtdComponent } from './tabs//etd/etd.component';
import { BillingComponent } from './tabs/billing/billing.component';
import { DeviceManagementComponent } from './tabs//device-management/device-management.component';
import { OrderingComponent } from './tabs//ordering/ordering.component';
import { TroubleshootingComponent } from './tabs//troubleshooting/troubleshooting.component';
import { MobileComponent } from './tabs//mobile/mobile.component';
import { ToolsComponent } from './tabs//tools/tools.component';
import { MAT_RIPPLE_GLOBAL_OPTIONS, RippleGlobalOptions } from '@angular/material/core';
import { DeviceCardComponent } from './common/device-card/device-card.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { BillingCardWidgetComponent } from './common/billing-card-widget/billing-card-widget.component';
import { CustomerLocationComponent } from './common/customer-location/customer-location.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { OrderStatusComponent } from './common/order-status/order-status.component';

import { ServiceStatusComponent } from './common/service-status/service-status.component';
import { BillingHistoryTableComponent } from './common/billing-history-table/billing-history-table.component';
import { ChartsModule } from 'ng2-charts';
import { DeviceConnectivityComponent } from './common/device-connectivity/device-connectivity.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TakePaymentFormComponent } from './common/modals/take-payment-form/take-payment-form.component';
const globalRippleConfig: RippleGlobalOptions = { disabled: true };
import { EtdWorkTicketComponent } from './common/etd-work-ticket/etd-work-ticket.component';
import { UtilsService } from './services/utils.service';
import { SearchService } from './services/search.service';
import { AddResolutionComponent } from './common/add-resolution/add-resolution.component';
import { HitHistoryTableComponent } from './common/hit-history-table/hit-history-table.component';
import { ManageWalletComponent } from './common/modals/manage-wallet/manage-wallet.component';
import { EditCustomerComponent } from './common/modals/edit-customer/edit-customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { DynamicformComponent } from './common/dynamicform/dynamicform.component';
import { StickyNoteComponent } from './overlays/sticky-note/sticky-note.component';
import { MobileLearnMoreComponent } from './common/modals/mobile-learn-more/mobile-learn-more.component';
import { MobileViewMoreComponent } from './common/modals/mobile-view-more/mobile-view-more.component';
import { EventDetailsComponent } from './modals/event-details/event-details.component';
import { EditAccountComponent } from './common/modals/edit-account/edit-account.component';
import { FuturePaymentComponent } from './common/modals/future-payment/future-payment.component';
import { PpvComponent } from './common/ppv/ppv.component';
import { ContactPreferenceComponent } from './common/modals/contact-preference/contact-preference.component';
import { VerifyAuthentiacteComponent } from './common/verify-authentiacte/verify-authentiacte.component';
import { SuccessManageWalletComponent } from './common/modals/success-manage-wallet/success-manage-wallet.component';



@NgModule({
  declarations: [
    AgentOsComponent,
    CourseListComponent,
    AgentOsMainComponent,
    SideBarComponent,
    SearchDialogComponent,
    DataCardComponent,
    DashboardComponent,
    CallReasonComponent,
    FieldOperationsComponent,
    EtdComponent,
    BillingComponent,
    DeviceManagementComponent,
    OrderingComponent,
    TroubleshootingComponent,
    MobileComponent,
    ToolsComponent,
    DeviceCardComponent,
    BillingCardWidgetComponent,
    CustomerLocationComponent,
    OrderStatusComponent,
    ServiceStatusComponent,
    BillingHistoryTableComponent,
    DeviceConnectivityComponent,
    TakePaymentFormComponent,
    EtdWorkTicketComponent,
    AddResolutionComponent,
    HitHistoryTableComponent,
    ManageWalletComponent,
    EditCustomerComponent,
    DynamicformComponent,
    StickyNoteComponent,
    MobileLearnMoreComponent,
    MobileViewMoreComponent,
    EventDetailsComponent,
    EditAccountComponent,
    FuturePaymentComponent,
    PpvComponent,
    ContactPreferenceComponent,
    VerifyAuthentiacteComponent,
    SuccessManageWalletComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AgentOsRoutingModule,
    MatTabsModule,
    MatExpansionModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatDialogModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonToggleModule,
    ChartsModule,
    IvyCarouselModule,
    MatStepperModule
  ],
  exports: [MatIconModule],
  providers: [
    AgentOsFlowsService,
    SharedService,
    SearchService,
    CardDataService,
    UtilsService,
    MatIconRegistry,
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: globalRippleConfig }]
})
export class AgentOsModule { }


