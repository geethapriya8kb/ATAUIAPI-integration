import { Injectable } from '@angular/core';
import { Settings } from '../entities/dtos/settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {

  private settings$: Settings = {
    apiEndPoint: ''
  };

  public getSettings(): Settings {
    return this.settings$;
  }

  public setSettings(settings: Settings): void {
    this.settings$ = settings;
  }
}
