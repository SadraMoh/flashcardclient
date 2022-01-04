import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonFabButton } from '@ionic/angular';
import { Card } from 'src/app/models/card/Card';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
})
export class FlipcardComponent implements OnInit {

  @Input('card')
  card: Card;

  // #region flipped
  _flipped: boolean = false;

  public get flipped(): boolean {
    return this._flipped;
  }

  @Input('flipped')
  public set flipped(v: boolean) {
    this._flipped = v;
    this.flippedChange.emit(v);
  }

  @Output("flippedChange")
  public flippedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // #endregion flipped

  // #region persian
  _persian: boolean = false;

  public get persian(): boolean {
    return this._persian;
  }

  @Input('persian')
  public set persian(v: boolean) {
    this._persian = v;
    this.persianChange.emit(v);
  }

  @Output("persianChange")
  public persianChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  // #endregion persian

  @ViewChild("fav")
  fav: any

  constructor(
    private favorite: FavoriteService,
  ) { }

  ngOnInit() { }

  flashClick(event: any) {

    if (event.path.includes(this.fav.el)) return;

    this.flipped = !this.flipped;
  }

  toggleFav() {
    this.card.isFavorite = !this.card.isFavorite;

    // to favor
    if (this.card.isFavorite)
      this.favorite.create(this.card.id)
    else
      this.favorite.remove(this.card.id)

  }

}
