import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private billingWidgetEmpty: any;
  constructor() {}

  public setBillingWidgetEmpty(billingWidgetEmpty: any): void {
    this.billingWidgetEmpty = billingWidgetEmpty;
  }

  public getBillingWidgetEmpty(): any {
    return this.billingWidgetEmpty;
  }
}
