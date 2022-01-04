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

<<<<<<< HEAD
    this.category = await this.db.findCat(this.category.id);
=======
    try {
      if ((await this.account.getUser()).isPermium) {
        this.category = await this.db.findCat(this.category.id);

        const allcards = await this.db.getCards()

        if (allcards)
          this.cards = allcards?.filter(i => i.categoryId == this.category.id);
      }
    } catch (error) { }

    this.categoryService.find(this.category.id)
      .subscribe(
        res => this.category = res.value
      )

    this.cardService.get(this.category.id)
      .subscribe(
        res => {
          this.cards = res.value

          this.cards.forEach(card => {
            this.db.addCard(card);
          })

          // initializes the first card
          this.next();
        }
      )

  }

  deltaX: number;
  dragging: boolean = false;
  readonly threshold = 75;

  ngAfterViewInit(): void {

    const cardGesture = this.gestureCtrl.create({
      gestureName: 'card',
      el: this.flipcard?.nativeElement,
      onStart: () => { this.dragging = true; this.flipcard.nativeElement.style.transitionProperty = ""; },
      onMove: (detail) => { this.deltaX = detail.deltaX },
      onEnd: () => {
>>>>>>> 882dc096f52dbcc323551fb720ea02836ce654e2

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
<<<<<<< HEAD
    this.persian = false;
    this.cardPlace = await this.slider.getActiveIndex();
=======
    this.deltaX = 0;
  }

  cardClick() {
    if (this.dragging) return;
    this.flipped = !this.flipped;
  }

  async toggleFav() {
    
    if(!this.account.loggedIn) {

      (await this.toastController.create({
        color: "danger",
        message: "برای نگه داشتن لیست علاقه مندی ها، ابتدا وارد حساب خود شوید",
        duration: 3000,
      })).present();
      
      return;
    }
    
    this.currentCard.isFavorite = !this.currentCard.isFavorite;

    // to favor
    if (this.currentCard.isFavorite)
      this.favorite.create(this.currentCard.id)
    else
      this.favorite.remove(this.currentCard.id)

>>>>>>> 882dc096f52dbcc323551fb720ea02836ce654e2
  }
  
}
