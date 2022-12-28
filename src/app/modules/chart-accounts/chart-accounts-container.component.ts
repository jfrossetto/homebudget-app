import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ChartAccountsStoreService, FormRequest } from '../../core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart-accounts-container',
  templateUrl: './chart-accounts-container.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})

export class ChartAccountsContainerComponent implements OnInit {
  
  crudMode$: Observable<any>;
  dataList$: Observable<any>;
  formDetails$: Observable<any>;

  constructor(private crudStore: ChartAccountsStoreService) { 
    this.crudMode$ = this.crudStore.crudMode$;
    this.dataList$ = this.crudStore.dataList$;    
    this.formDetails$ = this.crudStore.formDetails$;
  }

  ngOnInit(): void {
    this.gotoList();
    //this.crudStore.gotoList();
    //this.crudStore.search(3, 0);
  }

  gotoForm(request: FormRequest<string>) {
    this.crudStore.gotoForm(request);
  }

  gotoList() {
    this.crudStore.gotoList();
  }

}
