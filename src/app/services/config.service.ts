import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Controller } from './controller';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements Controller {

  readonly route = join(environment.api, 'config');

  constructor(
    private client: HttpClient,
  ) { }

  aboutUsText(): Observable<string> {
    const to = join(this.route, 'aboutUsText');

    return from(new Promise<string>((res, rej) => {
      this.client.get<string>(to, { responseType: 'text' as any }).subscribe(result => {
        res(result);
      });
    }))
  }

  contactUsText(): Observable<string> {
    const to = join(this.route, 'contactUsText');

    return from(new Promise<string>((res, rej) => {
      this.client.get<string>(to, { responseType: 'text' as any }).subscribe(result => {
        res(result);
      });
    }))
  }

  categoryPrice(): Observable<string> {
    const to = join(this.route, 'categoryPrice');

    return from(new Promise<string>((res, rej) => {
      this.client.get<string>(to, { responseType: 'text' as any }).subscribe(result => {
        res(result);
      });
    }))
  }

  version(): Observable<number> {
    const to = join(this.route, 'version');

    return from(new Promise<number>((res, rej) => {
      this.client.get<number>(to).subscribe(result => {
        res(result);
      });
    }))
  }

}
