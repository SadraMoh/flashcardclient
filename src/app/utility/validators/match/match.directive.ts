import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { match } from './match.validator';

@Directive({
  selector: '[match]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchDirective, multi: true }]
})
export class MatchDirective implements Validator {

  private _matchTo!: string;

  @Input('match')
  public set matchTo(v: string) {
    this._matchTo = v;
    this.control?.updateValueAndValidity();
    this.cd.detectChanges();
  }

  public get matchTo(): string {
    return this._matchTo;
  }

  control?: AbstractControl

  constructor(private cd: ChangeDetectorRef) {
  }
  
  /**
   * validate is called once onload - per instance of directive
   * this is used to capture the control 
   */
  validate(control: AbstractControl): ValidationErrors | null {
    this.control = control;
    return match(this.matchTo)(control)
  }
}