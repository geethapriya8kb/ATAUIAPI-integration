import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { MobileRoot } from './mobile.response';

@Injectable({
  providedIn: 'root'
})
export class MobileService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getDataFromAPI(accountId:number,identifier:string,applicationId :number): Observable<MobileRoot> {
    const endpoint = Endpoints.getmobile ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
    return this.doGet(endpoint,[],val);
  }
}

