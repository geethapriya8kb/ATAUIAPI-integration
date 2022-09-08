import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private billingWidgetEmpty: any;
  private billingWidgetAccount: any;
  constructor() {}

  public setBillingWidgetEmpty(billingEmpty: any): void {
    this.billingWidgetEmpty = billingEmpty;
  }

  public getBillingWidgetEmpty(): any {
    return this.billingWidgetEmpty;
  }
  public setBillingWidgetAccount(billingAccount: any): void {
    this.billingWidgetAccount = billingAccount;
  }

  public getBillingWidgetAccount(): any {
    return this.billingWidgetAccount;
  }
}
