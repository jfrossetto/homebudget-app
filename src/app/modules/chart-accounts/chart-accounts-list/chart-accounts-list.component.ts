import { Component, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ChartAccountsStoreService, IChartAccount } from 'src/app/core';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';

@Component({
  selector: 'app-chart-accounts-list',
  templateUrl: './chart-accounts-list.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush  
})
export class ChartAccountsListComponent implements AfterViewInit {

  @Input() public crudMode: string;
  @Input() public dataList: IChartAccount[];

  @Output() gotoForm = new EventEmitter<void>();
  
  displayedColumns: string[] = ['code', 'description', 'id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudStore: ChartAccountsStoreService) { }

  ngAfterViewInit(): void { 
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => this.search())
    )
    .subscribe();
  }

  goForm(): void {
    //this.gotoForm.emit();
    this.crudStore.gotoForm();
  }

  search(): void {
    this.crudStore.search(this.paginator.pageSize, 
                          this.paginator.pageIndex);
  }
}
