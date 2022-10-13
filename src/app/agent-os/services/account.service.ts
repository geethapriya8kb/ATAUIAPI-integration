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
  TicketDetail = new Subject();

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