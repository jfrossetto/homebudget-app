import { Component, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ChartAccountsStoreService, FormMode, FormRequest, IChartAccount, ListDetails } from 'src/app/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-chart-accounts-list',
  styleUrls: ['./chart-accounts-list.component.css'],
  templateUrl: './chart-accounts-list.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush  
})
export class ChartAccountsListComponent implements AfterViewInit {

  @Input() public crudMode: string;
  @Input() public listDetails: ListDetails<IChartAccount>;
  @Input() public loading: boolean;
  
  @Output() gotoForm = new EventEmitter<FormRequest<string>>();

  totalItens: number;
  displayedColumns: string[] = ['code', 'description', 'parentCode', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudStore: ChartAccountsStoreService,
              private _snackBar: MatSnackBar) { }

  ngAfterViewInit(): void { 

    this.paginator.pageIndex = this.listDetails.lastPageIndex;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => {
        console.log('tap table {}', this.sort.active)
        this.search()
      })
    )
    .subscribe();

    this.search();

  }

  goForm(): void {
    this.gotoForm.emit({mode: FormMode.add});
  }

  getRecord(entity: IChartAccount): void {
    console.log(entity);
    this.gotoForm.emit({mode: FormMode.update, id: entity.id});
  }

  search(): void {
    console.log(" sort: ", this.sort);
    this.crudStore.search(this.paginator.pageSize, 
                          this.paginator.pageIndex,
                          this.sort.active,
                          this.sort.direction);
  }

  deleteAccount(entity: IChartAccount): void {
    console.log(" delete account ", entity);
    this.crudStore.validateDelete(entity.id!).pipe(
      catchError((ex) => {
        console.log("error to delete", ex.error.error);
        this.alert(ex.error.error.message);
        throw ex;
      }),
      //ToDo modal to confirm delete 
      switchMap(() => this.crudStore.deleteAccount(entity.id!)),
      finalize(() => {
        console.log(" finalize delete ");
        this.search();
      })
    )
    .subscribe();
  }

  alert(msg: string) {
    this._snackBar.open(msg, 'Erro', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000,
    });

  }
}
