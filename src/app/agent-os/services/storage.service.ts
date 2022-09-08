import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private billingWidgetEmpty: any;
  private billingWidgetAccount: any;

  public helpfulEmpty: any;
  public helpfulAccount: any;
  
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

  public sethelpfulEmpty(helpfulEmpty: any): void {
    this.helpfulEmpty = helpfulEmpty;
  }

  public gethelpfulEmpty(): any {
    return this.helpfulEmpty;
  }
  public sethelpfulAccount(helpfulAccount: any): void {
    this.helpfulAccount = helpfulAccount;
  }

  public gethelpfulAccount(): any {
    return this.helpfulAccount;
  }
}
