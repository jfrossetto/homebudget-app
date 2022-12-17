import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { IChartAccount } from 'src/app/core';

@Component({
  selector: 'app-chart-accounts-ui',
  templateUrl: './chart-accounts-ui.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartAccountsUiComponent implements OnInit {

  @Input() public crudMode: string;
  @Input() public dataList: IChartAccount[];

  @Output() gotoForm = new EventEmitter<void>();
  @Output() gotoList = new EventEmitter<void>();

  constructor() {   }

  ngOnInit(): void {
  }

}
