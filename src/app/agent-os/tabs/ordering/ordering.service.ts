import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { OrderingRoot } from './ordering.response';

@Injectable({
  providedIn: 'root'
})
export class OrderingService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getDataFromAPI(accountId:number,identifier:string,applicationId :number): Observable<OrderingRoot> {
    const endpoint = Endpoints.getorder ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
    
    return this.doGet(endpoint,[],val);
  }
}