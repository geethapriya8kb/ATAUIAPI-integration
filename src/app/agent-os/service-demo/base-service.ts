import { HttpClient, HttpParams } from '@angular/common/http';
import { Endpoints } from '../entities/enums/Endpoints';
import { Observable } from 'rxjs';
import { Settings } from '../entities/dtos/settings';
import { RequestBase } from '../entities/requests/request-base';
import { QueryParam } from './QueryParam';
import { PathParam } from './PathParam';
import { SettingsService } from './settings.service';

export class BaseService {
  settings: Settings;

  constructor(
    public http: HttpClient,
    private settingsService: SettingsService
  ) {

    this.settings = this.settingsService.getSettings();
  }

  public getApiEndpoint(
    url: Endpoints,
    pathParams?: PathParam[]
  ): string {
    let endpoint: string = "https://localhost:7195/"

    let urlPath = url.toString();
    if (pathParams && pathParams.length) {

      pathParams.forEach(param => urlPath = urlPath.replace(`'${param.key}'`, param.value));

    }

    return `${endpoint}${urlPath}`;
  }

  public doGet<T>(
    url: Endpoints,
    pathParams?: PathParam[],
    queryParams?: QueryParam[]
  ): Observable<T> {
    const endpoint = this.getApiEndpoint(url, pathParams);

    const options = { params: this.getParams(queryParams) };
    
    return this.http.get<T>(endpoint, options);
  }

  public doPost<T>(
    url: Endpoints,
    request: RequestBase,
    pathParams?: PathParam[],
    queryParams?: QueryParam[],
  ): Observable<T> {
    const endpoint = this.getApiEndpoint(url, pathParams);

    const options = { params: this.getParams(queryParams) };

    return this.http.post<T>(endpoint, request, options);
  }

  public doDelete<T>(
    url: Endpoints,
    pathParams?: PathParam[],
    queryParams?: QueryParam[]
  ): Observable<T> {

    const endpoint = this.getApiEndpoint(url, pathParams);

    const options = { params: this.getParams(queryParams) };

    return this.http.delete<T>(endpoint, options);
  }

  public doPut<T>(
    url: Endpoints,
    request: RequestBase,
    pathParams?: PathParam[],
    queryParams?: QueryParam[],
  ): Observable<T> {

    const endpoint = this.getApiEndpoint(url, pathParams);

    const options = { params: this.getParams(queryParams) };
    return this.http.put<T>(endpoint, request, options);
  }

  private getParams(queryParams?: QueryParam[]): HttpParams {
    let params = new HttpParams()
    if (queryParams && queryParams.length) {
      queryParams.forEach(p =>
        params = params.append(p.key, p.value));
    }
    return params;
  }
}
