import { ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GroupService } from '../../service-demo/group.service';
import { SearchService } from '../../services/search.service';
import { StorageService } from '../../services/storage.service';
import { ContactPreferenceComponent } from '../modals/contact-preference/contact-preference.component';
import { EditAccountComponent } from '../modals/edit-account/edit-account.component';
import { EditCustomerComponent } from '../modals/edit-customer/edit-customer.component';
import { FuturePaymentComponent } from '../modals/future-payment/future-payment.component';
import { ManageWalletComponent } from '../modals/manage-wallet/manage-wallet.component';
import { PpvComponent } from '../ppv/ppv.component';
import { TakePaymentFormComponent } from '../take-payment-form/take-payment-form.component';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.scss'],
})
export class DataCardComponent implements OnInit, AfterViewInit {
  data: any = {};

  @Input() cardName: string = '';

  constructor(
    private searchService: SearchService,
    private groupservice: GroupService,
    private matDialog: MatDialog,
    private storeService: StorageService
  ) {}

  ngOnInit(): any {
    const accountNumber = this.searchService.getAccountNumber();
    const location = this.storeService.location;
    const accountDetails = this.storeService.accountDetails;
    const billingDetails = this.storeService.billingDetails;

    if ( accountNumber !='empty' &&
      location &&
      accountDetails &&
      billingDetails &&
      this.cardName != 'billing-billing' &&
      this.cardName != 'billing-history'
    ) {
      switch (this.cardName) {
        case 'location':
          return (this.storeService.location.subscribe((val: any) => {this.data = val})
          );
        case 'account':
          return (this.data = accountDetails);
        case 'billing':
          return (this.data = billingDetails);
      }
    } else {
      this.getCardData(accountNumber);
    }
  }

  ngAfterViewInit() {
    this.searchService.sharedValue$.subscribe((val) => {
      const accountNumber = val ? String(val) : '';
      this.getCardData(accountNumber);
    });
  }

  getCardData(accountNumber) {
    if (!accountNumber || accountNumber === '') accountNumber = 'empty';

    this.groupservice.getdatafromAPI(accountNumber, this.cardName).subscribe({
      next: (resp) => {
        this.data = JSON.parse(resp.content);
        if (accountNumber != 'empty') {
          switch (this.cardName) {
            case 'location':
              this.storeService.location.next(this.data)
              return;
            case 'account':
              return (this.storeService.accountDetails = this.data);
            case 'billing':
              return (this.storeService.billingDetails = this.data);
          }
          return null;
        }
        else
          if(accountNumber === 'empty' &&  this.cardName==='location')
          {
            this.storeService.locationEmpty = this.data
          }
        
      },
      error: (err) => console.log(err),
    });
  }

  public click(
    event: MouseEvent | KeyboardEvent,
    dialogValue: any,
    width: any
  ): void {
    const el: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
    let dialogComponent: ComponentType<any> = this.getComponent(dialogValue);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name: 'Take Payment' };
    dialogConfig.maxWidth = width;
    dialogConfig.height = '100%';
    let dialogRef = this.matDialog.open(dialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  getComponent(msg: string): any {
    switch (msg) {
      case 'ManageWalletComponent':
        return ManageWalletComponent;
      case 'TakePaymentFormComponent':
        return TakePaymentFormComponent;
      case 'EditCustomerDialogComponent':
        return EditCustomerComponent;
      case 'EditAccountDialogComponent':
        return EditAccountComponent;
      case 'ManageFuturePaymentComponent':
        return FuturePaymentComponent;
      case 'PPVtableComponent':
        return PpvComponent;
      case 'ContactPreferencesComponent':
        return ContactPreferenceComponent;
    }
    return null;
  }

  returnZero = () => 0;
}
