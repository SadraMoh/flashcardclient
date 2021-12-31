import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FallbackImageDirective } from './directives/fallback-image.directive';
import { TelnoDirective } from './validators/telno/telno.directive';
import { CategoryBlockComponent } from '../tabs/home/category-block/category-block.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    FallbackImageDirective,
    TelnoDirective,
    CategoryBlockComponent,
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  exports: [
    FallbackImageDirective,
    TelnoDirective,
    CategoryBlockComponent
  ]
})
export class UtilityModule { }
