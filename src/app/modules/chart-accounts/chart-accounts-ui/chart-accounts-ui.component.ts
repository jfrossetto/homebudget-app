import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormDetails, FormRequest, IChartAccount, EntitiesAutocomplete, ListDetails } from 'src/app/core';

@Component({
  selector: 'app-chart-accounts-ui',
  templateUrl: './chart-accounts-ui.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAccountsUiComponent implements OnInit {

  @Input() public crudMode: string;
  @Input() public listDetails: ListDetails<IChartAccount>;
  @Input() public formDetails: FormDetails<IChartAccount>;
  @Input() public entitiesAutocomplete: EntitiesAutocomplete;
  @Input() public loading: boolean;

  @Output() gotoForm = new EventEmitter<FormRequest<string>>();
  @Output() gotoList = new EventEmitter<void>();

  constructor() {   }

  ngOnInit(): void {
  }

}
