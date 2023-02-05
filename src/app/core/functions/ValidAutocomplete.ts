import { AbstractControl } from '@angular/forms';

export function ValidAutocomplete(control: AbstractControl) {
    const selection: any = control.value;
    if (typeof selection === 'string' && selection.length !== 0) {
        return { notMatch: true };
    }
    return null;
}