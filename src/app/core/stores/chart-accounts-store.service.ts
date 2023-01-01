import { Injectable } from '@angular/core';
import { ChartAccountsService } from '../services/chart-accounts.service';
import { FormDetails, FormMode, FormRequest } from '../models/form-details';
import { IChartAccount } from '../models/chart-account.model';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { EntitiesAutocomplete } from '../models/entities-autocomplete';

@Injectable({
  providedIn: 'root'
})
export class ChartAccountsStoreService {

  private readonly _crudMode = new BehaviorSubject<string>('');
  private readonly _dataList = new BehaviorSubject<IChartAccount[]>([]);
  private readonly _formDetails = new BehaviorSubject<FormDetails<IChartAccount>>({mode: FormMode.add, entity: {} as IChartAccount});
  private readonly _entitiesAutocomplete = new BehaviorSubject<EntitiesAutocomplete>({});

  readonly crudMode$ = this._crudMode.asObservable();
  readonly dataList$ = this._dataList.asObservable();
  readonly formDetails$ = this._formDetails.asObservable();
  readonly entitiesAutocomplete$ = this._entitiesAutocomplete.asObservable();

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

  private get formDetails(): FormDetails<IChartAccount> {
    return this._formDetails.getValue();
  }

  private get entitiesAutocomplete(): EntitiesAutocomplete {
    return this._entitiesAutocomplete.getValue();
  }

  public gotoList() {
    this.crudMode = 'list';
  }

  public gotoForm(request: FormRequest<string>) {

    if(request.mode === FormMode.add) {
      this.crudMode = 'form';
      this._formDetails.next({mode: FormMode.add, entity: {} as IChartAccount});
      return;
    }
    
    this.service
      .findById(request.id).pipe(
        switchMap(account => {
          this._formDetails.next({mode: request.mode, entity: account});
          this.crudMode = 'form';
          return this.service.findAutocomplete({ code:account.parentCode });
        }),
        map(ac => this._entitiesAutocomplete.next({account: ac[0]})),
        catchError(ex => {
          console.log("error gotoForm ", ex.error.error.message);
          throw ex;
        }))
      .subscribe();
  }

  public save(payload: IChartAccount, mode: FormMode, id?: string) {
    console.log("store save")
    if(mode === FormMode.update) {
      console.log("save update")
      this.service
        .update(payload, id)
        .subscribe(account => this.gotoList());
    }
    if(mode === FormMode.add) {
      console.log("save add")
      this.service
        .add(payload)
        .subscribe(account => this.gotoList());
    }
  }

  public search(pageSize: number, pageIndex: number) {
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

  public findAutocomplete(search: string): Observable<IChartAccount[]> {
    return this.service.findAutocomplete({ search: search });
  }

}

function tap(arg0: (account: any) => void): import("rxjs").OperatorFunction<IChartAccount, unknown> {
  throw new Error('Function not implemented.');
}

