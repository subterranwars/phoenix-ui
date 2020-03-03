import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) { }

  getState() {
      return this.http.get('http://localhost:8080/state'); // TODO MVR using fixed URL is bad
  }
}
