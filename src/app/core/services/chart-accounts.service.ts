import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { IChartAccount } from '../models/chart-account.model'; 
import { environment } from 'src/environments/environment';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ChartAccountsService {
  
  private readonly urlBase = environment.urlBase;
  private readonly service = 'account';

  get contextUrl() {
    return `${this.urlBase}/${this.service}`;
  }

  constructor(private http: HttpClient) { }

  public findAll(pageSize: number = 3,
                 pageIndex: number = 1): Observable<Page<IChartAccount>> {

    let params = new HttpParams()
          .set('pageSize', pageSize.toString())
          .set('pageIndex', pageIndex.toString());

    let headers = new HttpHeaders()
          .set('Authorization', 'token-api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

    return this.http
      .get<Page<IChartAccount>>(`${this.contextUrl}`, { headers, params });
  }

  findById(id: any): Observable<IChartAccount> {

    let headers = new HttpHeaders()
          .set('Authorization', 'token-api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

    return this.http
      .get<IChartAccount>(`${this.contextUrl}/${id}`, { headers });
    
  }

  update(payload: IChartAccount, id: any): Observable<IChartAccount> {

    let headers = new HttpHeaders()
          .set('Authorization', 'token-api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

    return this.http
      .put<IChartAccount>(`${this.contextUrl}/${id}`, payload, { headers });
    
  }

  add(payload: IChartAccount): Observable<IChartAccount> {

    let headers = new HttpHeaders()
          .set('Authorization', 'token-api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

    return this.http
      .post<IChartAccount>(`${this.contextUrl}`, payload, { headers });
    
  }

  findAutocomplete(param: { code?: string,
                            search?: string }): Observable<IChartAccount[]> {

    let params = new HttpParams()

    if (param.code) {
      params = params.set('code', param.code ? param.code : '');
    }
    if (param.search) {
      params = params.set('search', param.search ? param.search : '')
    }

    let headers = new HttpHeaders()
          .set('Authorization', 'token-api')
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json');

    return this.http
      .get<IChartAccount[]>(`${this.contextUrl}/autocomplete`, { headers, params });
    
  }

}
