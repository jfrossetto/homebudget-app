import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartAccountsStoreService, FormDetails, IChartAccount } from 'src/app/core';

@Component({
  selector: 'app-chart-accounts-form',
  templateUrl: './chart-accounts-form.component.html'
  ,changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ChartAccountsFormComponent implements OnInit, OnChanges {

  @Input() public formDetails: FormDetails<IChartAccount>;
  @Output() gotoList = new EventEmitter<void>();
  
  form = this.formBuilder.group({
    code:         ['', [Validators.required]],
    description:  ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private crudStore: ChartAccountsStoreService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formDetails && changes.formDetails.currentValue) {
      if(this.formDetails.entity) {
        this.form.patchValue(this.formDetails.entity);
      }
    }
  }

  goList(): void {
    //this.gotoList.emit();
    this.crudStore.gotoList();
  }

  resetForm(): void {
    console.log("reset")
    this.form.reset();
  }

  saveEntity(): void {
    console.log("saved")    
    if (this.form.valid) {
      const payload = {...this.form.getRawValue()};
      this.crudStore.save(payload, this.formDetails.entity?.id);
    }
  }


}
