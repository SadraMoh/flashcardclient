import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Input arguments are directive parameters */
export function match(matchTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const res = control.value === matchTo;

    // null if valid
    return !res ? { match: { value: control.value } } : null;
  };
}