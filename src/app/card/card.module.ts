import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardPageRoutingModule } from './card-routing.module';

import { CardPage } from './card.page';
import { UtilityModule } from '../utility/utility.module';

import { FlipcardComponent } from './flipcard/flipcard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardPageRoutingModule,
    UtilityModule
  ],
  declarations: [CardPage, FlipcardComponent],
})
export class CardPageModule {}
