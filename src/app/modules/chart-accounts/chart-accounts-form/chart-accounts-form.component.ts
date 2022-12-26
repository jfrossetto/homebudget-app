import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-chart-accounts-form',
  templateUrl: './chart-accounts-form.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ChartAccountsFormComponent implements OnInit {

  @Input() public crudMode: string;
  @Output() gotoList = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  goList(): void {
    this.gotoList.emit();
    //this.crudStore.gotoForm();
  }


}
