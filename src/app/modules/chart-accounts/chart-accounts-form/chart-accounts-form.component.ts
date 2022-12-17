import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chart-accounts-form',
  templateUrl: './chart-accounts-form.component.html'
})
export class ChartAccountsFormComponent implements OnInit {

  @Input() public crudMode: string;
  @Output() gotoList = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
