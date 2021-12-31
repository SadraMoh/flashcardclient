import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Res } from '../models/Res';
import { Controller } from './controller';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService implements Controller {

  readonly route = join(environment.api, 'favorite');

  constructor(private client: HttpClient) { }

  /**
   * request purchace link
   */
  create(cardId: number): Observable<boolean> {
    const to = join(this.route, 'create');

    return from(new Promise<boolean>((res) => {
      this.client.get<boolean>(to, { params: { id: cardId } }).subscribe(result => {
        res(true);
      });
    }))
  }

  /**
   * request purchace link
   */
  remove(cardId: number): Observable<boolean> {
    const to = join(this.route, 'remove');

    return from(new Promise<boolean>((res) => {
      this.client.get<boolean>(to, { params: { id: cardId } }).subscribe(result => {
        res(false);
      });
    }))
  }

}