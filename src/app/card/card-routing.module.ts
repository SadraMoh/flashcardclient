import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardPage } from './card.page';

// -> card
const routes: Routes = [
  {
    path: ':id',
    component: CardPage
  },
  {
    path: ':id/:cardId',
    component: CardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardPageRoutingModule {}
