import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

getAccountData(url: any) {
  //console.log(url);
  return this.http.get(url);
}

getinstalldata(url: any){
  return this.http.get(url);
}

getsidebardata(url: any){
return this.http.get(url);
}

getverifydata(url: any){
  return this.http.get(url);
  }
}