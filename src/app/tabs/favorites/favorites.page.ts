import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Card } from 'src/app/models/card/Card';
import { Category } from 'src/app/models/category/Category';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-download',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements ViewWillEnter {

  // cards: Card[] = [];
  cats: Category[] = [];

  working: boolean = false;

  constructor(
    private db: DbService,
  ) { }

  async ionViewWillEnter() {
    await this.loadData();
  }
  
  async loadData() {
    this.working = true;

    // const { cards } = await this.db.sourceOfTruth();
    // this.cards = cards.filter(i => i.isFavorite);

    const { cats } = await this.db.sourceOfTruth();
    this.cats = cats.filter(i => i.favoritesCount > 0);

    this.working = false;
  }

}
