import { AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { ChartAccountsStoreService, IChartAccount } from "src/app/core";


export const ChartAccountsValidators = {
    codeExists: (crudStore: ChartAccountsStoreService, id: AbstractControl) => (control: AbstractControl): Observable<any> => {
        const codeToCheck: string = control.value;
        return crudStore.codeExists(codeToCheck, id.value).pipe(
                map(exists => {
                    console.log(" codeExists ", exists);
                    return exists ? { codeExists: true } : null;
                })
        )
    }
}