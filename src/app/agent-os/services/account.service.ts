import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  ticketId = new BehaviorSubject("");
  ticketDetail = new BehaviorSubject({});
  public slaCheck:boolean;
  public slaComment :string;
  public fieldOpp:any;
  public truckCheck:boolean;
  public oocCheck:boolean;
  public ooc: any;
  public sTime:any;
  public sHour:any;
  public eHour:any;
  public eTime:any;
  public slaDate:any;
  public statusUpdate:any;
  public allData:any;
  public etdworkTicket :any;
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