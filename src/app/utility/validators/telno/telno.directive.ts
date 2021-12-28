import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { telno } from './telno.validator';

@Directive({
  selector: '[telno]',
  providers: [{ provide: NG_VALIDATORS, useExisting: TelnoDirective, multi: true }]
})
export class TelnoDirective implements Validator {
  
  validate(control: AbstractControl): ValidationErrors | null {
    return telno()(control)
  }
}