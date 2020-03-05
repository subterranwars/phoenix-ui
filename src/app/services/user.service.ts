import { Injectable } from '@angular/core';
import {Token} from '../model/Token';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {ResourceDepot} from '../model/ResourceDepot';
import {User} from '../model/User';
import {GameEvent} from '../model/GameEvent';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // tslint:disable-next-line:variable-name
  private _user: BehaviorSubject<User> = new BehaviorSubject(new User(-1, 'dummy'));

  private user: Observable<User> = this._user.asObservable();

  constructor(private http: HttpClient) { }

  register(user: Token): Observable<any> {
    return this.http.post(`users/register`, user);
  }

  getUser(): Observable<User> {
    this.http.get(`users/state`).subscribe((userJson: any) => {
      console.log('User State', userJson);
      const user = new User(userJson.id, userJson.name);
      const resourceDepots = userJson.resourceProductions.map(rp => {
        return new ResourceDepot(rp.storage.amount, rp.storage.capacity, rp.productionValue, rp.storage.resource);
      });
      user.setResourceDepots(resourceDepots);
      const events = userJson.events.map(e => {
          if (e.type === 'construction') {
            return new GameEvent(e.completedInSeconds, 'Gebäudebau: ' + e.building.label + ' (Stufe: ' + e.level + ' )');
          }
      });
      user.setEvents(events);
      // user.setBuildings(buildings);
      this._user.next(user);
    });
    return this.user;
  }
}
