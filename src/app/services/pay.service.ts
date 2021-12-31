import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Res, isResVaild } from '../models/Res';
import { Controller } from './controller';

@Injectable({
  providedIn: 'root'
})
export class PayService implements Controller {

  readonly route = join(environment.api, 'pay');

  constructor(private client: HttpClient) { }

  /**
   * request purchace link
   */
  buy(): Observable<Res<string>> {
    const to = join(this.route, 'buy');

    return from(new Promise<Res<string>>((res, rej) => {
      this.client.get<Res<string>>(to, {responseType: 'text' as any}).subscribe(result => {
          res(result);
      });
    }))
  }

}
