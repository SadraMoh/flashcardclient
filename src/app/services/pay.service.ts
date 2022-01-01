import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models/pay/Buy';
import { Check } from '../models/pay/Check';
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
  buy(): Observable<Buy> {
    const to = join(this.route, 'buy');

    return from(new Promise<Buy>((res, rej) => {
      this.client.get<string>(to, { responseType: 'text' as any }).subscribe(result => {

        const url = result;
        const trans_id = result.split('/').pop();

        const ans: Buy = {
          trans_id,
          url
        }

        res(ans);
      });
    }))
  }

  /**
   * check purchase state
   */
  check(token_id: string): Observable<Res<Check>> {
    const to = join(this.route, 'check');

    return from(new Promise<Res<Check>>((res, rej) => {
      this.client.get<Res<Check>>(to, { params: { token_id } }).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }



}
