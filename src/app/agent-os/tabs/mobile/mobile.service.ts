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
  getDataFromAPI(id:number,identifier:string): Observable<MobileRoot> {
    const endpoint = Endpoints.getmobile ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      console.log(val);
      console.log(endpoint); 
    return this.doGet(endpoint,[],val);
  }
}

