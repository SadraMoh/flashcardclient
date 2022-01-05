import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card/Card';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-download',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage implements OnInit {

  cards: Card[] = [];

  working: boolean = false;

  constructor(
    private db: DbService,
  ) { }

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.working = true;

    const { cards } = await this.db.sourceOfTruth();
    this.cards = cards.filter(i => i.isFavorite);

    this.working = false;
  }

}
