import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  ticketId = new BehaviorSubject("");
  ticketDetail = new BehaviorSubject({});
  public slaComment :string;
  public etdTicket :any;
  public fieldOpp:any;
constructor(private http: HttpClient) { 
}

getAccountData(url: any) {
  return this.http.get(url);
}

getinstalldata(url: any){
  return this.http.get(url);
}

getsidebardata(url: any){
return this.http.get(url);
}

getverifydata(url: any) {
  return this.http.get(url);
}


}