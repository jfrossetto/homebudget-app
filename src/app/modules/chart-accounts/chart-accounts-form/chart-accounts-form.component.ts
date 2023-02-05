import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, SimpleChanges, OnChanges } from '@angular/core';
import { AbstractControl, FormBuilder, FormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { ChartAccountsStoreService, EntitiesAutocomplete, FormDetails, FormMode, IChartAccount } from 'src/app/core';
import { ValidAutocomplete } from 'src/app/core/functions/ValidAutocomplete';
import { ChartAccountsValidators } from '../chart-accounts-validators';

@Component({
  selector: 'app-chart-accounts-form',
  templateUrl: './chart-accounts-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush    
})
export class ChartAccountsFormComponent implements OnInit, OnChanges {

  @Input() public formDetails: FormDetails<IChartAccount>;
  @Input() public entitiesAutocomplete: EntitiesAutocomplete;
  @Input() public loading: boolean;
  
  @Output() gotoList = new EventEmitter<void>();
  
  form = this.formBuilder.group({
    id: [''],
    code:          ['', {validators: [Validators.required],
                         updateOn: 'blur'}],
    parentCodeAc:  ['', {validators: [ValidAutocomplete]}],
    description:   ['', [Validators.required]]
  });

  optionsParentCode$: Observable<IChartAccount[]>;

  constructor(private formBuilder: FormBuilder,
              private crudStore: ChartAccountsStoreService) {}

  ngOnInit(): void {
  
    this.optionsParentCode$ = this.form.controls['parentCodeAc'].valueChanges.pipe(
      startWith(''),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((val) => {
        if( typeof val === 'string' ) {
          console.log(' search ac', val);
          return this.crudStore.findAutocomplete(val);
        }
        console.log(" val = ", val , typeof(val))
        return of([{...val}]);
      })
    );
    this.setFormValidators();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.formDetails && changes.formDetails.currentValue) {
      if(this.formDetails.mode === FormMode.add) {
        console.log("ngOnChanges add");
        console.log(" id: ", this.formDetails.entity.id)
        this.form.reset();
        this.form.controls['code'].enable();
        this.form.controls['parentCodeAc'].setValue('');
        return;
      }
      console.log("ngOnChanges edit");        
      this.form.patchValue(this.formDetails.entity);
      this.form.controls['code'].disable();
    }
    if (changes.entitiesAutocomplete && changes.entitiesAutocomplete.currentValue) {
      if (this.entitiesAutocomplete.account) {
        console.log("ngOnChanges entitiesAutocomplete");
        this.form.controls['parentCodeAc']
          .setValue({
            code: this.entitiesAutocomplete.account?.code,
            description: this.entitiesAutocomplete.account?.description
          });
      }
      if(this.entitiesAutocomplete.nextCode) {
        console.log("ngOnChanges nextCode")
        this.form.get('code')?.setValue(this.entitiesAutocomplete.nextCode);
      }                   
    }
  }

  private setFormValidators() {
    this.form.get('code')?.setAsyncValidators([ChartAccountsValidators.codeExists(this.crudStore, 
                                                                                  this.accountId)]);
  }

  goList(): void {
    this.crudStore.gotoList();
  }

  resetForm(): void {
    console.log("reset");
    this.crudStore.gotoForm({mode: FormMode.add});
  }

  saveEntity(): void {
    if (this.form.valid) {
      const payload = {...this.form.getRawValue() as IChartAccount,
                        parentCode: this.form.get('parentCodeAc')?.value.code};
      console.log("saved payload: {}", payload);
      this.crudStore.save(payload, this.formDetails.mode, this.formDetails.entity?.id);
    }
  }

  displayAutocomplete(obj: any): string {
    console.log(" display obj = ", obj, typeof(obj))    
    return obj && obj.code && obj.description 
              ? `${obj.code}-${obj.description}` : '';
  }

  selectedOption(event: any) {
    console.log(" parent selected ", event.option.value.code, event);
  }

  editCode() {
    console.log("editCode");
    this.form.controls['code'].enable();
  }

  nextCode() {
    if (this.formDetails.mode === FormMode.add) {
      console.log("nextCode parentCode", this.form.get('parentCodeAc')?.value.code);
      this.crudStore.nextCode(this.form.get('parentCodeAc')?.value.code)
      return;
    }
    this.form.get('code')?.setValue(this.formDetails.entity.code);
  }

  private get accountId() : AbstractControl {
    return this.form.controls['id'];
  }

}
