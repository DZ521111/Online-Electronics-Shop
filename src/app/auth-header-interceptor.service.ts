import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { read } from 'fs';
import { Observable } from 'rxjs';
import { TokenStorageService } from './core/auth/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHeaderInterceptorService implements HttpInterceptor{

  constructor(private tokenStorage: TokenStorageService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = this.tokenStorage.getToken();
    const cloneRequest = req.clone({
      headers: req.headers.set(
        'Authorization', token? `Bearer ${token}`: ''
      )
    });
    return next.handle(cloneRequest);
  }
}
