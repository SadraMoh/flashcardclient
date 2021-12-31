import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritesPage } from './favorites.page';

import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { UtilityModule } from 'src/app/utility/utility.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FavoritesPageRoutingModule,
    UtilityModule
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
