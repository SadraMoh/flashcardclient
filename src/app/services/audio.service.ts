import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(
  ) { }

  /**
   * @todo check if file is present, then process to load
   * @param address 
   * @param callback 
   */
  async play(address: string, callback?: Function) {

    const aud = new Audio(address);
    aud.play();
      
    // if (Capacitor.getPlatform().toLowerCase() == 'web') {
      
    //   const res = await fetch(address);
    //   await (new Audio(URL.createObjectURL(await res.blob()))).play()

    //   return 
    // }
    // // else if native...

    // await this.nativeAudio.preloadSimple(address, address)
    // await this.nativeAudio.play(address, (e) => { callback?.(e) });
  }

}
