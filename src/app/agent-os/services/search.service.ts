import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private defaultValue = 'empty';

  private accountNumber: string = this.defaultValue; 

  sharedValue$ = new Subject();

  constructor() { }

  public setAccountNumber(acctNumber: string): void {
    if (!acctNumber || acctNumber.trim() == '') {
      acctNumber = this.defaultValue;
    }
    this.accountNumber = acctNumber;
  }

  public getAccountNumber(): string {
    return this.accountNumber;
  }

  public clearSearchFields(): void {
    this.accountNumber = this.defaultValue;   
  }
}
