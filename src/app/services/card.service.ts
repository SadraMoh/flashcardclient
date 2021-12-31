import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card/Card';
import { Res, isResVaild } from '../models/Res';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  readonly route = join(environment.api, 'card');

  constructor(private client: HttpClient) { }

  /**
   * get category cards
   * @param categoryId id
   */
  get(categoryId: number): Observable<Res<Card[]>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<Card[]>>((res, rej) => {
      this.client.get<Res<Card[]>>(to, { params: {id: categoryId} }).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

}
