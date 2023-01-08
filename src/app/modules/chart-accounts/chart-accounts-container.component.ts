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
  listDetails$: Observable<any>;
  formDetails$: Observable<any>;
  entitiesAutocomplete$: Observable<any>;
  loading$: Observable<any>;

  constructor(private crudStore: ChartAccountsStoreService) { 
    this.crudMode$ = this.crudStore.crudMode$;
    this.listDetails$ = this.crudStore.listDetails$;
    this.formDetails$ = this.crudStore.formDetails$;
    this.entitiesAutocomplete$ = this.crudStore.entitiesAutocomplete$;
    this.loading$ = this.crudStore.loading$;
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
