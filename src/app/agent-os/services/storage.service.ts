import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public billingWidgetAccount: any;

  public helpfulAccount: any;
  
  public location: any;
  public accountDetails: any;
  public billingDetails: any;
  public billingVertical: any;
  public billingHistory: any;

  constructor() {}

 
  public sethelpfulAccount(helpfulAccount: any): void {
    this.helpfulAccount = helpfulAccount;
  }

  public gethelpfulAccount(): any {
    return this.helpfulAccount;
  }
}
