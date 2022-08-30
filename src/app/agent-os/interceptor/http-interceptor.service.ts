import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Settings } from '../entities/dtos/settings';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  private settings: Settings;

  constructor(settingsService: SettingsService) {

    this.settings = settingsService.getSettings();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      headers: req.headers
        .set('Access-Control-Allow-Origin', this.settings.apiEndPoint)
        .set('Access-Control-Allow-Methods', '*')
        .set('Access-Control-Expose-Headers', 'X-Token')
        .set('Content-Type', 'application/json')
    });

    return next.handle(modifiedReq);
  }
}
