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
  getdatafromAlertResponseAPI(id:number,identifier:string): Observable<AlertRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);

  }
  getdatafromEventHistoryAPI(id:number,identifier:string): Observable<EventHistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);
  }

  getdatafromHitHistoryAPI(id:number,identifier:string): Observable<HitHistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);
  }

  getdatafromHistoryAPI(id:number,identifier:string): Observable<HistoryRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);
  }

  getDataFromSymptomsAPI(id:number,identifier:string): Observable<SymptomsRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);
  }

  getDataFromTsIssuesAPI(id:number,identifier:string): Observable<TsIssuesRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      console.log(endpoint);
      
    return this.doGet(endpoint,[],val);
  }

  

}
