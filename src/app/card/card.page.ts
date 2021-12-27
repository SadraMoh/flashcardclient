import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  /** is the card flipped to reveal the text behind it */
  flipped: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
