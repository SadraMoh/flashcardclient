import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card/Card';
import { Category } from 'src/app/models/category/Category';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  query: string;

  categories: Category[]

  cards: Card[]

  public get queriedCards(): Card[] {
    return this.cards.filter(i => i.englishTitle.includes(this.query.trim()) || i.translationPersianTitle.includes(this.query.trim()));
  }

  working: boolean = false;

  constructor(
    private db: DbService,
  ) { }

  async ngOnInit() {
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

