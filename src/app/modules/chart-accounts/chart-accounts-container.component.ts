import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChartAccountsStoreService } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart-accounts-container',
  templateUrl: './chart-accounts-container.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartAccountsContainerComponent implements OnInit {
  
  crudMode$: Observable<any>;
  dataList$: Observable<any>;

  constructor(private crudStore: ChartAccountsStoreService) { 
    this.crudMode$ = this.crudStore.crudMode$;
    this.dataList$ = this.crudStore.dataList$;    
  }

  ngOnInit(): void {
    this.crudStore.gotoList();
    //this.crudStore.search(3, 0);
  }

  gotoForm() {
    this.crudStore.gotoForm();
  }

  gotoList() {
    this.crudStore.gotoList();
  }

}
