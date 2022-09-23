import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';

@Injectable({
  providedIn: 'root'
})
export class SideBarService extends BaseService {
  constructor(
    http: HttpClient,
    settingsService: SettingsService) {
    super(http, settingsService);
  }
  getDataFromAPI(id:number,identifier:string): Observable<any> {
    const endpoint = Endpoints.getorder ;
    const val: QueryParam[] =
      [{ key: "id", value: id.toString()},
      { key: "identifier", value: identifier.toString()}];
      
    
    return this.doGet(endpoint,[],val);
  }
}