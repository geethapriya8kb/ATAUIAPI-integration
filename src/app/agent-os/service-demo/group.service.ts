import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../entities/dtos/group';
import { Endpoints } from '../entities/enums/Endpoints';
import { BaseService } from './base-service';
import { SettingsService } from './settings.service';
import { QueryParam } from './QueryParam';

@Injectable({
  providedIn: 'root',
})
export class GroupService extends BaseService {
  constructor(http: HttpClient, settingsService: SettingsService) {
    super(http, settingsService);
  }
  getdatafromAPI(accountId:number,identifier:string,applicationId :number): Observable<any> {
    const endpoint = Endpoints.getbillingwidget;
    const val: QueryParam[] =  [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];

    return this.doGet(endpoint, [], val);
  }
}
