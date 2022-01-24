import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Res } from '../models/Res';
import { Controller } from './controller';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService implements Controller {

  readonly route = join(environment.api, 'favorite');

  constructor(private client: HttpClient, private db: DbService) { }

  create(cardId: number): Observable<boolean> {
    const to = join(this.route, 'create');

    this.db.favCard(cardId);

    // add to category favcount
    this.db.getCats().then(cats => {
      this.db.getCards().then(cards => {
        const card = cards.find(card => card.id == cardId);

        const catIndex = cats.findIndex(cat => cat.id == card.categoryId);
        cats[catIndex].favoritesCount++

        this.db.setCats(cats)
      })
    });

    return from(new Promise<boolean>((res) => {
      this.client.post<boolean>(to, null, { params: { id: cardId } }).subscribe(result => {
        res(true);
      });
    }))
  }

  remove(cardId: number): Observable<boolean> {
    const to = join(this.route, 'remove');

    this.db.unfavCard(cardId);

    // subtract frp, category favcount
    this.db.getCats().then(cats => {
      this.db.getCards().then(cards => {
        const card = cards.find(card => card.id == cardId);

        const catIndex = cats.findIndex(cat => cat.id == card.categoryId);
        cats[catIndex].favoritesCount--

        this.db.setCats(cats)
      })
    });
    
    return from(new Promise<boolean>((res) => {
      this.client.post<boolean>(to, null, { params: { id: cardId } }).subscribe(result => {
        res(false);
      });
    }))
  }

}
