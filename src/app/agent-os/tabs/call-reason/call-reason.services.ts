import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { CallReasonRoot } from './call-reason.response';

@Injectable({
  providedIn: 'root',
})
export class CallReasonService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getdatafromCallReasonAPI(id: number, identifier: string): Observable<CallReasonRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
      
      
    return this.doGet(endpoint,[],val);

  }
}
