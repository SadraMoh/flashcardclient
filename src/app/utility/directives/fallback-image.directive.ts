import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fallbackImage]'
})
export class FallbackImageDirective {

  @Input()
  fallbackImage!: string;

  constructor(private eRef: ElementRef<HTMLImageElement>) { }

  @HostListener('error')
  loadFallbackOnError() {
    const element: HTMLImageElement = <HTMLImageElement>this.eRef.nativeElement;
    element.setAttribute('failedToLoad', element.src);
    element.src = this.fallbackImage || './assets/svg/failed.svg';
  }

}
