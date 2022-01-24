import { Component, OnInit } from '@angular/core';
import { ViewWillEnter } from '@ionic/angular';
import { Card } from 'src/app/models/card/Card';
import { Category } from 'src/app/models/category/Category';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements ViewWillEnter {

  query: string;

  categories: Category[]

  cards: Card[]

  public get queriedCards(): Card[] {
    return (this.cards
      ?.filter(i =>
        i.englishTitle.toLowerCase().includes(this.query.toLowerCase().trim())
        || i.translationPersianTitle.includes(this.query.trim())
      )).slice(0, 25);
  }

  working: boolean = false;

  constructor(
    private db: DbService,
  ) { }

  async ionViewWillEnter() {
    await this.loadData();
  }

  async loadData() {
    this.working = true;

    const { cards, cats } = await this.db.sourceOfTruth();
    this.cards = cards;
    this.categories = cats;

    this.working = false;
  }
}

