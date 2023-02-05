import { Component, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ChartAccountsStoreService, FormMode, FormRequest, IChartAccount, ListDetails } from 'src/app/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { catchError, filter, finalize, switchMap, tap } from 'rxjs/operators';
import { merge, Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

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
              private _snackBar: MatSnackBar,
              private dialog: MatDialog) { }

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
    this.crudStore.validateDelete(entity.id!).pipe(
      catchError((ex) => {
        console.log("cannot delete", ex.error.error);
        this.alert(ex.error.error.message);
        throw ex;
      }),
      switchMap(() => this.confirmDelete()),
      filter(confirm => confirm),
      switchMap(() => {
        console.log(" delete account ", entity);
        return this.crudStore.deleteAccount(entity.id!)
      }),
      finalize(() => {
        console.log(" finalize delete ");
        this.search();
      })
    )
    .subscribe();
  }

  confirmDelete(): Observable<any> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 300,
      hasBackdrop: true,
      data: {message: "Exclui conta? "}
    });
    return dialogRef.afterClosed();
  }

  alert(msg: string) {
    this._snackBar.open(msg, 'Erro', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 5000,
    });

  }
}
