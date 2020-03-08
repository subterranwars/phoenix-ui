import { Injectable } from '@angular/core';
import {Token} from '../model/Token';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  register(user: Token): Observable<any> {
    return this.http.post(`users/register`, user);
  }
}
