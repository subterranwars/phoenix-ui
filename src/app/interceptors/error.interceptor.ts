import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log('ERROR RESPONSE :(', err);
      // auto logout if 401/403 response returned from api
      if (err.status === 401) {
        console.log('Unauthorized/Forbidden');
        this.authenticationService.logout();
        location.reload();
        return;
      }

      const error = err.message || err.statusText;
      return throwError(error);
    }));
  }
}
