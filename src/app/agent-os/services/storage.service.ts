import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public billingWidgetAccount: any;
  public helpfulAccount: any;  
  public location= new ReplaySubject(1);
  public accountDetails: any;
  public billingDetails: any;
  public billingVertical: any;
  public billingHistory: any;
  public orderStatusAccount:any;
  public serviceStatusAccount:any;
  public customer:any;
  public locationEmpty:any;
  public editAccount:any;
  public courseListAccounts:any;
  constructor() {
   
  }

 
  public sethelpfulAccount(helpfulAccount: any): void {
    this.helpfulAccount = helpfulAccount;
  }

  public gethelpfulAccount(): any {
    return this.helpfulAccount;
  }
}
