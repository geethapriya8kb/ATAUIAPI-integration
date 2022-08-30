import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatementHistory } from '../entities/dtos/statement-history';
import { StatementHistoryResponse } from '../entities/responses/statement-history-response';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CardDataService {
  constructor(private http: HttpClient) { }

  getCardData(url: any): Observable<any> {
    return this.http.get(url);
  }

  getCardDatafromService(cardName: any): Observable<any> {
    const dataFileName = `assets/data/${cardName}.json`;
    return this.http.get(dataFileName);
  }

  getProductsSmall(): Observable<StatementHistoryResponse> {

    const url = `assets/data/call-reason.json`;

    return this.http
      .get<any>(url);
  }

  getAccountData(url: any) {
    return this.http.get(url);
  }

  getProvisioningData(accountNumber): Observable<any[]> {
    if(accountNumber){
      const dataFileName = `assets/data/${accountNumber}/provision.json`;
      return this.http.get<any[]>(dataFileName);
    }
    else{
      return this.http.get<any[]>('./assets/data/empty/provision.json');
    }
 
  }
}
