import { Injectable } from '@angular/core';
import { ChartAccountsService } from '../services/chart-accounts.service';
import { FormDetails, FormMode, FormRequest } from '../models/form-details';
import { IChartAccount } from '../models/chart-account.model';
import { BehaviorSubject, Observable, of, pipe } from 'rxjs';
import { catchError, filter, finalize, map, switchMap, tap } from 'rxjs/operators';
import { EntitiesAutocomplete } from '../models/entities-autocomplete';
import { SortDirection } from '@angular/material/sort';
import { ListDetails } from '../models/list-details';

@Injectable({
  providedIn: 'root'
})
export class ChartAccountsStoreService {

  private readonly _crudMode = new BehaviorSubject<string>('');
  private readonly _listDetails = new BehaviorSubject<ListDetails<IChartAccount>>({dataList: [], lastPageIndex:0, 
                                                                                   lastPageSize: 5, totalItens: 0});
  private readonly _formDetails = new BehaviorSubject<FormDetails<IChartAccount>>({mode: FormMode.add, entity: {} as IChartAccount});
  private readonly _entitiesAutocomplete = new BehaviorSubject<EntitiesAutocomplete>({});
  private readonly _loading = new BehaviorSubject<boolean>(false);

  readonly crudMode$ = this._crudMode.asObservable();
  readonly listDetails$ = this._listDetails.asObservable();
  readonly formDetails$ = this._formDetails.asObservable();
  readonly entitiesAutocomplete$ = this._entitiesAutocomplete.asObservable();
  readonly loading$ = this._loading.asObservable();

  constructor(private service: ChartAccountsService) { }

  private get crudMode(): string {
    return this._crudMode.getValue();
  }

  private set crudMode(mode: string) {
    this._crudMode.next(mode);
  }

  private get listDetails(): ListDetails<IChartAccount> {
    return this._listDetails.getValue();
  }

  private get formDetails(): FormDetails<IChartAccount> {
    return this._formDetails.getValue();
  }

  private get entitiesAutocomplete(): EntitiesAutocomplete {
    return this._entitiesAutocomplete.getValue();
  }

  private get loading(): boolean {
    return this._loading.getValue();
  }

  private set loading(load: boolean) {
    this._loading.next(load);
  }

  public gotoList() {
    this.crudMode = 'list';
    this._formDetails.next({mode: FormMode.add, entity: {} as IChartAccount});
    this._entitiesAutocomplete.next({});
  }

  public gotoForm(request: FormRequest<string>) {

    if(request.mode === FormMode.add) {
      this.crudMode = 'form';
      this._formDetails.next({mode: FormMode.add, entity: {} as IChartAccount});
      this._entitiesAutocomplete.next({});      
      return;
    }
    
    this.service
      .findById(request.id).pipe(
        switchMap(account => {
          this._formDetails.next({mode: request.mode, entity: account});
          this.crudMode = 'form';
          return account.parentCode 
              ? this.service.findAutocomplete({ code:account.parentCode })
              : of([{} as IChartAccount]);
        }),
        tap(parent => this._entitiesAutocomplete.next({account: parent[0]})),
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

  public search(pageSize: number, pageIndex: number,
                sortBy: string, direction: SortDirection) {
    this.loading = true;                  
    this.service
        .findAll(pageSize, pageIndex+1, sortBy, direction)
        .pipe(
          tap(data => {
            console.log('total pages ', data.totalPages, ' items', data.totalItems);
            this._listDetails.next({lastPageIndex: pageIndex, lastPageSize: pageSize,
                                    totalItens: data.totalItems, dataList: data.items});
          }),
          finalize(() => this.loading = false)
        )
        .subscribe();
  }

  public findAutocomplete(search: string): Observable<IChartAccount[]> {
    return this.service.findAutocomplete({ search: search });
  }

  public nextCode(parentCode: string) {
    this.service
      .findNextCode(parentCode)
      .pipe(
        tap(nextCode => this._entitiesAutocomplete.next({...this.entitiesAutocomplete,
                                                         nextCode: nextCode})
        ))
      .subscribe();
  }

  public validateDelete(id: string): Observable<any> {
    return this.service.validateDelete(id);
  }

  public deleteAccount(id: string): Observable<boolean> {
    return this.service.delete(id);
  }

  public codeExists(code: string, id?: string): Observable<boolean> {
    return this.service.codeExists(code, id);
  }

}

