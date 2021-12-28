import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/** Input arguments are directive parameters */
export function telno(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const res = /09........./.test(control.value);
    
    // null if valid
    return !res ? {telno: {value: control.value}} : null;
  };
}