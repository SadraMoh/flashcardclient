import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { CategoryBlockComponent } from './category-block/category-block.component';
import { FallbackImageDirective } from 'src/app/utility/directives/fallback-image.directive';
import { UtilityModule } from 'src/app/utility/utility.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    UtilityModule
  ],
  declarations: [HomePage, CategoryBlockComponent]
})
export class HomePageModule {}
