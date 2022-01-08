import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { join } from '@fireflysemantics/join';
import { Observable, from, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { isResVaild, Res } from '../models/Res';
import { Controller } from './controller';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService implements Controller {

  readonly route = join(environment.api, 'config');

  constructor(
    private client: HttpClient,
    private db: DbService,
  ) { }

  async aboutUsText(forceDownload = false): Promise<string> {
    const to = join(this.route, 'aboutUsText');

    if (!forceDownload) {
      const fromDb = await this.db.get('aboutUsText');
      if (fromDb) return fromDb;
    }

    return new Promise<string>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe(result => {
        this.db.set('aboutUsText', result.value);
        res(result.value);
      });
    })
  }

  async contactUsText(forceDownload = false): Promise<string> {
    const to = join(this.route, 'contactUsText');

    if (!forceDownload) {
      const fromDb = await this.db.get('contactUsText');
      if (fromDb) return fromDb;
    }

    return new Promise<string>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe(result => {
        this.db.set('contactUsText', result.value);
        res(result.value);
      });
    })
  }

  async categoryPrice(forceDownload = false): Promise<string> {
    const to = join(this.route, 'categoryPrice');

    if (!forceDownload) {
      const fromDb = await this.db.get('categoryPrice');
      if (fromDb) return fromDb;
    }

    return new Promise<string>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe(result => {
        this.db.set('categoryPrice', result.value);
        res(result.value);
      });
    })
  }

  async permiumText(forceDownload = false): Promise<string> {
    const to = join(this.route, 'permiumText');

    if (!forceDownload) {
      const fromDb = await this.db.get('permiumText');
      if (fromDb) return fromDb;
    }

    return new Promise<string>((res, rej) => {
      this.client.get<Res<string>>(to).subscribe(result => {
        if (isResVaild(result)) {
          this.db.set('permiumText', result.value);
          res(result.value);
        }
        else
          rej(result.message)
      });
    })
  }

  /** get latest version */
  async dataversion(): Promise<number> {
    const to = join(environment.api, 'all', 'dataversion');

    return new Promise<number>((res, rej) => {
      this.client.get<number>(to).subscribe(result => {
        res(result);
      });
    })
  }

}
