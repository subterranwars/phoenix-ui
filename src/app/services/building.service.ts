import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  getBuildings() {
    return this.http.get('/buildings');
  }

  build(user: User, buildingId: any) {
    return this.http.post(`/buildings?userId=${user.id}&buildingId=${buildingId}`, null)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
