import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { IChartAccount } from '../models/chart-account.model'; 
import { environment } from 'src/environments/environment';

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
    //headers.set('Access-Control-Allow-Origin', '*');    
    //headers.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    //headers.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');

    return this.http
      .get<Page<IChartAccount>>(`${this.contextUrl}`, { headers, params });
  }

}