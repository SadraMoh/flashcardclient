import { Injectable } from '@angular/core';
import { Directory, Filesystem } from '@capacitor/filesystem';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver'

import { Storage } from '@ionic/storage-angular';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  /**
   * @see https://github.com/ionic-team/ionic-storage#api
   * @see https://ionicframework.com/docs/angular/your-first-app/saving-photos
   */

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
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
  async saveImg(imgUrl: string) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(imgUrl);

    // Write the file to the data directory
    // const fileName = new Date().getTime() + '.jpeg';

    // get guid and extention (4cc9b309-b3a6-452d-b002-8e2ded1da7b3.png)
    const fileName = imgUrl.split('/').pop();
    
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: imgUrl
    };
  }

  async readAsBase64(imgUrl: string) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(imgUrl);
    const blob = await response.blob();

    return await this.convertBlobToBase64(blob) as string;
  }

  private convertBlobToBase64 = (blob: Blob) => new Promise((res, rej) => {
    const reader = new FileReader;
    reader.onerror = rej;
    reader.onload = () => {
      res(reader.result);
    };
    reader.readAsDataURL(blob);
  });

}
