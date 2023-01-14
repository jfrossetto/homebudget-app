import { AbstractControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { debounceTime, distinctUntilChanged, map, startWith, switchMap } from "rxjs/operators";
import { ChartAccountsStoreService, IChartAccount } from "src/app/core";


export const ChartAccountsValidators = {
    codeExists: (crudStore: ChartAccountsStoreService) => (control: AbstractControl): Observable<any> => {
        const codeToCheck: string = control.value;
        return crudStore.findAutocomplete(codeToCheck).pipe(
                map(account => {
                    console.log(" codeExists ", account);
                    return account[0] ? { codeExists: true } : null;
                })
        )
    }
}