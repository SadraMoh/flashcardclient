import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private db: DbService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const modifiedReq = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${token}`),
    // });

    const contentType: string = req.headers.get('content-type');

    if (!req.url.includes('/Card/'))
      return next.handle(req);

    if (contentType.includes('audio')) {
      console.log(req.url);
    }
    else if (contentType.includes('image')) {
      console.log(req.url);
    }

    return next.handle(req);

  }

}
