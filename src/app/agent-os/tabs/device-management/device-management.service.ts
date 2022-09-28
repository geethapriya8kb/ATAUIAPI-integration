import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Endpoints } from '../../entities/enums/Endpoints';
import { BaseService } from '../../service-demo/base-service';
import { QueryParam } from '../../service-demo/QueryParam';
import { SettingsService } from '../../service-demo/settings.service';
import { DeviceManagementRoot } from './device-management.response';

@Injectable({
  providedIn: 'root',
})
export class DeviceManagementService extends BaseService {
  constructor(http: HttpClient, settingsService: SettingsService) {
    super(http, settingsService);
  }
  getdatafromDeviceManagementAPI(
    id: number,
    identifier: string
  ): Observable<DeviceManagementRoot> {
    const endpoint = Endpoints.getetdaccount;
    const val: QueryParam[] = [
      { key: 'id', value: id.toString() },
      { key: 'identifier', value: identifier.toString() },
    ];
    return this.doGet(endpoint, [], val);
  }
}
