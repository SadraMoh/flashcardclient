import { Component, OnInit, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../models/card/Card';
import { Category } from '../models/category/Category';
import { CardService } from '../services/card.service';
import { CategoryService } from '../services/category.service';
import { Gesture, GestureController, GestureDetail, ToastController } from '@ionic/angular';
import { FavoriteService } from '../services/favorite.service';
import { DbService } from '../services/db.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit, AfterViewInit {

  category: Category = {} as Category;

  /** all of this category's cards */
  cards: Card[] = [
    // {
    //   id: 1,
    //   englishTitle: "duck",
    //   englishVoice: "https://file.englishcard.ir/Uploads/Card/BATHROOM/hamper.mp3",
    //   imageUrl: "data:image/jpeg;base64,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",
    //   isFavorite: false,
    //   translationPersianTitle: "اردک"
    // },
    // {
    //   id: 2,
    //   englishTitle: "goose",
    //   englishVoice: "https://file.englishcard.ir/Uploads/Card/BATHROOM/hamper.mp3",
    //   imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Domestic_Goose.jpg/774px-Domestic_Goose.jpg",
    //   isFavorite: true,
    //   translationPersianTitle: "غاز"
    // },
    // {
    //   id: 3,
    //   englishTitle: "koala",
    //   englishVoice: "https://file.englishcard.ir/Uploads/Card/BATHROOM/hamper.mp3",
    //   imageUrl: "data:image/jpeg;base64,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",
    //   isFavorite: false,
    //   translationPersianTitle: "کوئالا"
    // },
  ];

  /** current visible cards */
  currentCard: Card;

  public get cardPlace(): number {
    return this.cards.indexOf(this.currentCard);
  }

  public get nextCard(): Card | undefined {
    if (this.cardPlace == this.cards.length - 1) return undefined;
    return this.cards[this.cardPlace + 1];
  }

  public get prevCard(): Card | undefined {
    if (this.cardPlace == 0) return undefined;
    return this.cards[this.cardPlace - 1];
  }

  /** is the card flipped to reveal the text behind it */
  flipped: boolean = false;

  @ViewChild("flipcard")
  flipcard?: ElementRef<HTMLDivElement>;

  constructor(
    private cardService: CardService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private gestureCtrl: GestureController,
    private favorite: FavoriteService,
    private db: DbService,
    public toastController: ToastController,
    public account: AccountService,
  ) { }

  async ngOnInit() {
    this.category.id = this.route.snapshot.params["id"];

    if ((await this.account.getUser()).isPermium) {
      this.category = await this.db.findCat(this.category.id);

      const allcards = await this.db.getCards()

      if (allcards)
        this.cards = allcards?.filter(i => i.categoryId == this.category.id);
    }

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

        this.flipcard.nativeElement.style.transitionProperty = "transform";

        // if a slide was recognized, slide to that direction, else reset position
        if (this.deltaX > this.threshold)
          this.previous();
        else if (this.deltaX < this.threshold * -1)
          this.next();
        else
          this.deltaX = 0; // x reset

        setTimeout(() => {
          this.dragging = false
          this.flipcard.nativeElement.style.transitionProperty = "";
        }, 200);

      },
    }, true)

    cardGesture.enable();

  }

  next() {
    if (!this.nextCard) {
      this.deltaX = 0;
      return;
    }

    this.currentCard = this.nextCard;
    this.cardWasChanged(this.currentCard);
  }

  previous() {
    if (!this.prevCard) {
      this.deltaX = 0;
      return;
    }

    this.currentCard = this.prevCard;
    this.cardWasChanged(this.currentCard);
  }

  cardWasChanged(e: Card) {
    this.flipped = false;
    this.deltaX = 0;
  }

  cardClick() {
    if (this.dragging) return;
    this.flipped = !this.flipped;
  }

  toggleFav() {
    this.currentCard.isFavorite = !this.currentCard.isFavorite;

    // to favor
    if (this.currentCard.isFavorite)
      this.favorite.create(this.currentCard.id)
    else
      this.favorite.remove(this.currentCard.id)

  }
}
