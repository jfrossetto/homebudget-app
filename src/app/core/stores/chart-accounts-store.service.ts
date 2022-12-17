import { Injectable } from '@angular/core';
import { ChartAccountsService } from '../services/chart-accounts.service';
import { Page } from '../models/page';
import { IChartAccount } from '../models/chart-account.model';
import { BehaviorSubject, of, pipe } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChartAccountsStoreService {

  private readonly _crudMode = new BehaviorSubject<string>('');
  private readonly _dataList = new BehaviorSubject<IChartAccount[]>([]);

  readonly crudMode$ = this._crudMode.asObservable();
  readonly dataList$ = this._dataList.asObservable();

  constructor(private service: ChartAccountsService) { }

  private get crudMode(): string {
    return this._crudMode.getValue();
  }

  private set crudMode(mode: string) {
    this._crudMode.next(mode);
  }

  private get dataList(): IChartAccount[] {
    return this._dataList.getValue();
  }

  private set dataList(data: IChartAccount[]) {
    this._dataList.next(data);
  }

  public gotoList() {
    this.crudMode = 'list';
  }

  public gotoForm() {
    this.crudMode = 'form';
  }

  public search(pageSize: number, pageIndex: number) {
    //this._dataList.next(TABLE_DATA);
    this.service
        .findAll(pageSize, pageIndex+1)
        .pipe(
          map(data => {
            console.log('total pages ', data.totalPages);
            return data.items;
          })
        )
        .subscribe(accounts => this._dataList.next(accounts));
  }

}

