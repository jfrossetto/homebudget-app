import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { ChartAccountsStoreService, FormDetails, FormMode, IChartAccount } from 'src/app/core';

@Component({
  selector: 'app-chart-accounts-form',
  templateUrl: './chart-accounts-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ChartAccountsFormComponent implements OnInit, OnChanges {

  @Input() public formDetails: FormDetails<IChartAccount>;
  @Output() gotoList = new EventEmitter<void>();
  
  form = this.formBuilder.group({
    code:         ['', [Validators.required]],
    parentCode:   [''],
    description:  ['', [Validators.required]]
  });

  optionsParentCode$: Observable<IChartAccount[]>;

  constructor(private formBuilder: FormBuilder,
              private crudStore: ChartAccountsStoreService) {}

  ngOnInit(): void {
  
    this.optionsParentCode$ = this.form.controls['parentCode'].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val) => {
        return this.crudStore.findAutocomplete(val);
      })
    );

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formDetails && changes.formDetails.currentValue) {
      if(this.formDetails.mode === FormMode.add) {
        console.log("changes add");
        this.form.reset();
        return;
      }
      console.log("changes edit");        
      this.form.patchValue(this.formDetails.entity);
    }
  }

  goList(): void {
    this.crudStore.gotoList();
  }

  resetForm(): void {
    console.log("reset");
    this.crudStore.gotoForm({mode: FormMode.add});
    //this.form.reset();
  }

  saveEntity(): void {
    console.log("saved")    
    if (this.form.valid) {
      const payload = {...this.form.getRawValue()};
      //this.crudStore.save(payload, this.formDetails.entity?.id);
      this.crudStore.save(payload, this.formDetails.mode, this.formDetails.entity?.id);
    }
  }


}
