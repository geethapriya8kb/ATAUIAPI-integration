import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { Settings } from '../entities/dtos/settings';

@Injectable({ providedIn: 'root' })
export class SettingsHttpService {


  constructor(
    private http: HttpClient,
    private settingsService: SettingsService) {
  }

  initializeApp(): Promise<any> {

    return new Promise(
      (resolve) => {
        this.http.get('assets/settings.json')
          .toPromise()
          .then(response => {
            this.settingsService.settings = response as Settings;
            resolve(true);
          });
      }
    );
  }
}
