import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { DbService } from 'src/app/services/db.service';

@Directive({
  selector: '[cacheload]'
})
export class CacheloadDirective {

  private url: string;

  @Input('cacheload')
  public set cacheload(v: string) {
    this.url = v;
    this.init();
  };

  constructor(
    private eRef: ElementRef<HTMLImageElement | HTMLAudioElement>,
    private db: DbService
  ) { }

  async init() {

    const ref = this.eRef.nativeElement;

    if (ref instanceof HTMLImageElement) {
      ref.setAttribute('img', '')
    }
    else if (ref instanceof HTMLAudioElement) {
      ref.setAttribute('audio', '')
    }

    // attempt to get image from db
    let imageData = await this.db.get(this.url)

    try {
      // save the image if it's not available
      imageData ??= await (await this.db.save(this.url)).data as string;
    } 
    catch (error) { 
      imageData = "./assets/svg/failed.svg";
    }

    //const ext = this.url.split('/').pop().split('.').pop();
    // ref.src = `data:image/${ext};base64, ${imageData}`;
    ref.src = imageData;

  }

}
