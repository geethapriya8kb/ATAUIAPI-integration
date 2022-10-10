import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { EtdResponse, ETDRoot } from './etd.response';

@Injectable({
  providedIn: 'root',
})
export class EtdService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getdatafromAPI(accountId:number,identifier:string,applicationId :number): Observable<ETDRoot> {
    const endpoint = Endpoints.getetdaccount ;
    const val: QueryParam[] =
      [{ key: "accountId", value: accountId.toString()},
      { key: "identifier", value: identifier.toString()},
      { key: "id", value: applicationId.toString()}
    ];
      
      
      
      
    return this.doGet(endpoint,[],val);

  }
}
