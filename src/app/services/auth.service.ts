import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {User} from '../model/User';

@Injectable({ providedIn: 'root' })
export class AuthService {
  currentUser: User;
  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    return this.http.post<any>(`users/authenticate`, { username, password })
      .pipe(map((res: any) => {
        if (res && res.token && res.username) {
          localStorage.setItem('access_token', res.token);
          this.currentUser = new User(res.id, res.username, res.token);
          return this.currentUser;
        }
        return this.currentUser;
      }));
  }

  logout() {
    // TODO MVR actually invoke logout to revoke token
    // remove user from local storage to log user out
    const removedToken = localStorage.removeItem('access_token');
    console.log('LOGOUT', removedToken);
    if (removedToken == null) {
      this.router.navigate(['login']);
    }
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
