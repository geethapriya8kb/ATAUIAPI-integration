import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Settings } from '../models/settings';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsHttpService {

  constructor(
    private http: HttpClient,
    private settingsService: SettingsService) {
  }

  initializeApp(): Promise<any> {

    return new Promise(
      (resolve) => {
        this.http.get('assets/settings.json')
          .subscribe({
            next: (resp) => { this.settingsService.settings = resp as Settings },
            error: (err) => console.error(err),
            complete: () => resolve(true)
          });
      }
    );
  }

}
