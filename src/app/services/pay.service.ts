import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Buy } from '../models/pay/Buy';
import { Check } from '../models/pay/Check';
import { Res, isResVaild } from '../models/Res';
import { AccountService } from './account.service';
import { Controller } from './controller';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PayService implements Controller {

  readonly route = join(environment.api, 'pay');

  constructor(
    private client: HttpClient,
    private user: UserService
  ) { }

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
}
