import { Component, OnInit, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/card/Card';
import { Category } from '../models/category/Category';
import { CardService } from '../services/card.service';
import { CategoryService } from '../services/category.service';
import { IonSlides, ToastController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { DbService } from '../services/db.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  category: Category = {} as Category;

  /** all of this category's cards */
  cards: Card[] = [];

  /** current visible cards */
  currentCard: Card;

  public get cardPlace(): number {
    return this.cards.indexOf(this.currentCard);
  }

  public set cardPlace(v: number) {
    this.currentCard = this.cards[v];
  }

  @ViewChild('slider')
  slider: IonSlides;
  
  /** is the card flipped to reveal the text behind it */
  flipped: boolean = false;

  /** should the card reveal its persian translation */
  persian: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    public toastController: ToastController,
    public account: AccountService,
    public cardService: CardService
  ) { }

  async ngOnInit() {
    
    this.category.id = this.route.snapshot.params["id"];

    this.category = await this.db.findCat(this.category.id);

    const allcards = await this.db.getCards()

    if (allcards)
      this.cards = allcards?.filter(i => i.categoryId == this.category.id);

    // if data wasn't available in the db
    if (this.cards.length == 0) {
      // get it from the api
      await new Promise<void>(resolve => {
        this.cardService.get(this.category.id)
        .subscribe(res => {
          this.cards = res.value;
          this.db.addCard(...this.cards);
          resolve();
        })
      })
    }

    // set first cards
    this.currentCard = this.cards[0];

  }

  async slideChange() {
    this.flipped = false;
    this.persian = false;
    this.cardPlace = await this.slider.getActiveIndex();
  }
  
}
