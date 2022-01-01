import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { join } from '@fireflysemantics/join';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category/Category';
import { isResVaild, Res } from '../models/Res';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  readonly route = join(environment.api, 'category');

  constructor(private client: HttpClient) { }

  /**
   * get all categories
   */
  get(): Observable<Res<Category[]>> {
    const to = join(this.route, 'get');

    return from(new Promise<Res<Category[]>>((res, rej) => {
      this.client.get<Res<Category[]>>(to).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

  /**
  * find category by id
  */
  find(id: number): Observable<Res<Category>> {
    const to = join(this.route, 'find');

    return from(new Promise<Res<Category>>((res, rej) => {
      this.client.get<Res<Category>>(to, { params: { id } }).subscribe(result => {
        if (isResVaild(result))
          res(result);
        else
          rej(result.message);
      });
    }))
  }

}
