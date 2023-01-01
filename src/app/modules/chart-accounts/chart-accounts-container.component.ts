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
  entitiesAutocomplete$: Observable<any>;

  constructor(private crudStore: ChartAccountsStoreService) { 
    this.crudMode$ = this.crudStore.crudMode$;
    this.dataList$ = this.crudStore.dataList$;    
    this.formDetails$ = this.crudStore.formDetails$;
    this.entitiesAutocomplete$ = this.crudStore.entitiesAutocomplete$;
  }

  ngOnInit(): void {
    this.gotoList();
  }

  gotoForm(request: FormRequest<string>) {
    this.crudStore.gotoForm(request);
  }

  gotoList() {
    this.crudStore.gotoList();
  }

}
