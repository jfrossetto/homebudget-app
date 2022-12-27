import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormDetails, IChartAccount } from 'src/app/core';

@Component({
  selector: 'app-chart-accounts-ui',
  templateUrl: './chart-accounts-ui.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAccountsUiComponent implements OnInit {

  @Input() public crudMode: string;
  @Input() public dataList: IChartAccount[];
  @Input() public formDetails: FormDetails<IChartAccount>;

  @Output() getEntityById = new EventEmitter<string>();
  @Output() gotoList = new EventEmitter<void>();

  constructor() {   }

  ngOnInit(): void {
  }

  getEntity(id: any) {
    this.getEntityById.emit(id);
  }

}
