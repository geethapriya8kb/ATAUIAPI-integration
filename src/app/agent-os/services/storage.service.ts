import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private billingWidget: any;
  constructor() {}

  public setBillingWidget(billingWidget: any): void {
    this.billingWidget = billingWidget;
  }

  public getBillingWidget(): any {
    return this.billingWidget;
  }
}
