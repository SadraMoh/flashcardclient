import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card/Card';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  /** all of this category's cards */
  cards: Card[] = [];
  
  /** current visible cards */
  currentCard: Card;
  
  /** is the card flipped to reveal the text behind it */
  flipped: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  pronounce(card: Card): void {
    
  }

}
