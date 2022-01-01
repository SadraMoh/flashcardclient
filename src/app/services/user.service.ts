import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signin } from '../models/account/Signin';
import { Res, isResVaild } from '../models/Res';
import { User } from '../models/user/User';
import { Controller } from './controller';

@Injectable({
  providedIn: 'root'
})
export class UserService implements Controller {

  readonly route = join(environment.api, 'user');

  constructor(
    private client: HttpClient,
    private router: Router,
  ) { }

  find(): Observable<Res<User>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<User>>((res, rej) => {
      this.client.get<Res<User>>(to).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

}
