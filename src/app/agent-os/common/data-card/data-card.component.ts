import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GroupService } from '../../service-demo/group.service';
import { CardDataService } from '../../services/card-data.service';
import { SearchService } from '../../services/search.service';
import { SharedService } from '../../services/shared.service';
import { DynamicformComponent } from '../dynamicform/dynamicform.component';
import { EditCustomerComponent } from '../modals/edit-customer/edit-customer.component';
import { ManageWalletComponent } from '../modals/manage-wallet/manage-wallet.component';
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
    private groupservice:GroupService,
    private matDialog: MatDialog
  ) { }

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
   // const path = `${accountNumber}/${this.cardName}`;

    this.groupservice.getdatafromAPI(accountNumber,this.cardName).subscribe({
      next: (resp) => {
        this.data= JSON.parse(resp.content);
      },
      error: (err) => console.log(err),
    });
  }

  public click(event: MouseEvent | KeyboardEvent, dialogValue: any, width: string): void {

    const el: HTMLButtonElement = event.currentTarget as HTMLButtonElement;
    let dialogComponent: ComponentType<any> = this.getComponent(dialogValue);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { name: 'Take Payment' };
    dialogConfig.width = width;
    dialogConfig.height = '100%';
    let dialogRef = this.matDialog.open(dialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((value) => {
      console.log(`Dialog sent: ${value}`);
    });
  }

  getComponent(msg: string):any{
    switch(msg) {
      case 'ManageWalletComponent': return ManageWalletComponent;
      case 'TakePaymentFormComponent': return TakePaymentFormComponent;
      case 'EditCustomerDialogComponent': return EditCustomerComponent;

    }
    return null;
  }

  returnZero = () => 0;
}
