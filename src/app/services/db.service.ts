import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category/Category';
import { Card } from '../models/card/Card';

import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  /**
   * @see https://github.com/ionic-team/ionic-storage#api
   * @see https://ionicframework.com/docs/angular/your-first-app/saving-photos
   */

  private _storage: Storage | null = null;

  constructor(
    private storage: Storage,
    private platform: Platform,
    private client: HttpClient
  ) {
    this.init();
  }

  public async getCats(): Promise<Category[]> {
    return await JSON.parse(await this.get('cats'));
  }

  public async findCat(catId: number): Promise<Category> {
    return await (await this.getCats()).find(i => i.id == catId);
  }
  
  public async setCats(cats: Category[]): Promise<string> {
    return await this.set('cats', JSON.stringify(cats));
  }

  public async getCards(): Promise<Card[]> {
    return await JSON.parse(await this.get('cards'));
  }

  public async findCard(cardId: number): Promise<Card> {
    return await (await this.getCards()).find(i => i.id == cardId);
  }

  public async addCard(cats: Card): Promise<string> {
    const arr = [].concat(cats);
    return await this.set('cards', JSON.stringify(arr));
  }

  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);

    const storage = await this.storage.create();
    this._storage = storage;
  }

  public set(key: string, value: any): Promise<string> {
    return this._storage?.set(key, value);
  }

  public get(key: string): Promise<string> {
    return this._storage?.get(key);
  }

  public save(url: string) {
    return new Promise<{ data: string | ArrayBuffer, filename: string }>((resolve, reject) => {
      this.client.get(url, { responseType: 'blob', })
        .subscribe(async blob => {
          const data = await this.blobToImg(blob)

          const filename = url;

          await this.set(filename, data);

          resolve({ data, filename });
        })
    })
  }

  public load(filename: string): Promise<string> {
    return this.get(filename)
  }

  blobToImg(image: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", () => {
        resolve(reader.result);
      }, false);

      if (image)
        reader.readAsDataURL(image);
    })
  }

  // public async saveCategory(cat: Category, cards: Card[]) {

  //   let cats: Category[] = JSON.parse(await this.get("categories"));
  //   cats ??= [];
  //   cats.push?.(cat);
  //   await this.set("categories", JSON.stringify(cats));

  //   const tasks: Promise<any>[] = [];
  //   cards.forEach(card => tasks.push(this.save(card.imageUrl), this.save(card.englishVoice)))

  //   return await Promise.all(tasks)

  // }

}
