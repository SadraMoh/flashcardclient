import { Injectable } from '@angular/core';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

import { Storage } from '@ionic/storage-angular';
import { Category } from '../models/category/Category';
import { Card } from '../models/card/Card';

import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from './category.service';

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
    private client: HttpClient,
    public toastController: ToastController,
    private categoryService: CategoryService
  ) {
    this.init();
  }

  public async setVersion(versionNum: number): Promise<string> {
    return await this.set('version', versionNum);
  }

  public async getVersion(): Promise<Number> {
    return Number(await this.get('version'));
  }

  public async getCats(): Promise<Category[]> {
    const dbRes = await this.get('cats');
    if (!dbRes) return [];
    const data = JSON.parse(dbRes) as Category[];
    return data;
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

  public async setCards(cards: Card[]): Promise<string> {
    return await this.set('cards', JSON.stringify(cards));
  }

  public async addCard(...cards: Card[]): Promise<string> {
    const arr = [].concat(cards);
    return await this.set('cards', JSON.stringify(arr));
  }

  public async updateCard(card: Card) {
    const cards = await this.getCards() ?? [];
    const indexInvalidated = cards.findIndex(i => i.id == card.id);
    cards[indexInvalidated] = card;
    return await this.setCards(cards);
  }

  public async favCard(cardId: number) {
    const card = await this.findCard(cardId);
    card.isFavorite = true;
    return this.updateCard(card);
  }

  public async unfavCard(cardId: number) {
    const card = await this.findCard(cardId);
    card.isFavorite = false;
    return this.updateCard(card);
  }


  initialized: boolean = false;
  async init() {
    await this.storage.defineDriver(CordovaSQLiteDriver);

    const storage = await this.storage.create();
    this._storage = storage;

    this.initialized = true;

    const dbVersion = await this.getVersion();
    if (dbVersion == undefined) await this.setVersion(1);
  }

  /** returns true when the storage is ready, use with await to wait for when the storage is ready */
  async storageIsReady(): Promise<true> {
    return new Promise<true>((resolve) => {
      const timer = setInterval(() => {
        if (this.initialized) {
          resolve(true);
          clearInterval(timer);
        }
      }, 5);
    })
  }

  public async set(key: string, value: any): Promise<string> {
    await this.storageIsReady();
    return await this._storage.set(key, value);
  }

  public async get(key: string): Promise<string> {
    await this.storageIsReady();
    return await this._storage.get(key);
  }

  public async exists(key: string): Promise<boolean> {
    await this.storageIsReady();
    return Boolean(await this._storage.get(key));
  }

  public save(url: string) {
    return new Promise<{ data: string | ArrayBuffer, filename: string }>(async (resolve, reject) => {

      this.client.get(url, { responseType: 'blob' })
        .subscribe(async blob => {
          const data = await this.blobToImg(blob)

          const filename = url;

          await this.set(filename, data);

          resolve({ data, filename });
        },
          (err) => reject(err))
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

  public async sourceOfTruth(forceDownload: boolean = false): Promise<{ cats: Category[], cards: Card[], version: number }> {

    // from db
    let categories: Category[]
    let cards: Card[]

    // do not attempt to get data from the db when forceDownload is true
    if (!forceDownload) {
      categories = await this.getCats();
      cards = await this.getCards();
    }

    if (!categories || !cards) {
      // 1
      const downloading = (await this.toastController.create({
        color: "primary",
        message: 'در حال دانلود دیتای برنامه، لطفا صبر کنید...',
        duration: 4000,
      }));
      downloading.present();

      // 2
      const fromCloud = await new Promise<{ cats: Category[], cards: Card[], version: number }>((resolve, reject) => {
        this.categoryService.all()
          .subscribe(
            async res => {

              const all = res.value;
              const cloudCards = all.map(pair => pair.cards).reduceRight((acc = [], curr) => acc.concat(curr));
              const cloudCats = all.map(pair => pair.category).sort((a) => a.isFree ? -1 : 1);

              await this.setCards(cloudCards);
              await this.setCats(cloudCats);

              // 3
              downloading.dismiss();
              (await this.toastController.create({
                color: "success",
                message: 'دیتا با موفقیت دانلود شد',
                duration: 2000,
              })).present();

              resolve({ cats: cloudCats, cards: cloudCards, version: 0 }); // @todo version 

            },
            async err => {
              // err
              downloading.dismiss();
              (await this.toastController.create({
                color: "danger",
                message: 'دانلود دیتا با مشکل مواجه شد، لطا اتصال خود را به اینترنت بررسی کنید',
                duration: 4000,
              })).present();

              reject(err)

            });
      });

      return fromCloud;
    }
    else {
      // from db
      return { cats: categories, cards, version: 0 }  // @todo version 
    }

  }
}
