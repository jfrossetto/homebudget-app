import { Component, Input, AfterViewInit, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
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

  @Output() getEntityById = new EventEmitter<string>();

  displayedColumns: string[] = ['code', 'description', 'id'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private crudStore: ChartAccountsStoreService) { }

  ngAfterViewInit(): void { 
    
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      tap(() => {
        console.log('tap table')
        this.search()
      })
    )
    .subscribe();

    this.search();

  }

  goForm(): void {
    this.getEntityById.emit('');
  }

  getRecord(entity: IChartAccount): void {
    console.log(entity);
    this.getEntityById.emit(entity.id);
  }

  search(): void {
    this.crudStore.search(this.paginator.pageSize, 
                          this.paginator.pageIndex);
  }
}
