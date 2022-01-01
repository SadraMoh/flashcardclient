import { Injectable } from '@angular/core';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';
import { Category } from '../models/category/Category';
import { Card } from '../models/card/Card';

import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';

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
    private platform: Platform
  ) {
    this.init();
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

  /**
   * @param imgUrl the url of the image eg. "http://localhost:8084/Uploads/CategoryIcon/4cc9b309-b3a6-452d-b002-8e2ded1da7b3.png"
   * @returns 
   */
  async save(imgUrl: string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(imgUrl);

    // Write the file to the data directory
    // const fileName = new Date().getTime() + '.jpeg';

    const fileName = imgUrl.split('/').pop();
    
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      // Display the new image by rewriting the 'file://' path to HTTP
      // Details: https://ionicframework.com/docs/building/webview#file-protocol
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    }
    else {
      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: imgUrl
      };
    }
  }

  /**
   * 
   * @param fileName file to read
   * @returns base64
   */
  async read(imgUrl: string): Promise<string> {

    const fileName = imgUrl.split('/').pop();
    
    const readFile = await Filesystem.readFile({
      path: fileName,
      directory: Directory.Data
    })

    return readFile.data
  }

  async readAsBase64(imgUrl: string) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: imgUrl
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(imgUrl);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((res, rej) => {
    const reader = new FileReader;
    reader.onerror = rej;
    reader.onload = () => {
      res(reader.result);
    };
    reader.readAsDataURL(blob);
  });


  public async saveCategory(cat: Category, cards: Card[]) {

    let cats: Category[] = JSON.parse(await this.get("categories"));
    cats ??= [];
    cats.push?.(cat);
    await this.set("categories", JSON.stringify(cats));

    const tasks: Promise<any>[] = [];
    cards.forEach(card => tasks.push(this.save(card.imageUrl), this.save(card.englishVoice)))

    return await Promise.all(tasks)

  }

}
