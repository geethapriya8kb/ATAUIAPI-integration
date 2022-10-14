import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { AlertRoot } from './alert.response';
import { EventHistoryRoot } from './eventHistory.response';
import { HistoryRoot } from './history.response';
import { HitHistoryRoot } from './hithistory.response';
import { SymptomsRoot } from './symptoms.response';
import { TsIssuesRoot } from './tsissues.response';

@Injectable({
  providedIn: 'root',
})
export class TroubleShootingService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getdatafromAlertResponseAPI(accountId:number,identifier:string,applicationId:number): Observable<AlertRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] = [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];                 
    return this.doGet(endpoint,[],val);

  }
  getdatafromEventHistoryAPI(accountId:number,identifier:string,applicationId:number): Observable<EventHistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
      
      
    return this.doGet(endpoint,[],val);
  }

  getdatafromHitHistoryAPI(accountId:number,identifier:string,applicationId:number): Observable<HitHistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
      
    return this.doGet(endpoint,[],val);
  }

  getdatafromHistoryAPI(accountId:number,identifier:string,applicationId:number): Observable<HistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
      
    return this.doGet(endpoint,[],val);
  }

  getDataFromSymptomsAPI(accountId:number,identifier:string,applicationId:number): Observable<SymptomsRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
      
    return this.doGet(endpoint,[],val);
  }

  getDataFromTsIssuesAPI(accountId:number,identifier:string,applicationId:number): Observable<TsIssuesRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
    [
      { key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "applicationId", value: applicationId.toString()}
    ];
      
      
      
    return this.doGet(endpoint,[],val);
  }

  

}
