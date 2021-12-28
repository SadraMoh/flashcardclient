import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallbackImageDirective } from './directives/fallback-image.directive';
import { TelnoDirective } from './validators/telno/telno.directive';

@NgModule({
  declarations: [
    FallbackImageDirective,
    TelnoDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FallbackImageDirective,
    TelnoDirective,
  ]
})
export class UtilityModule { }
