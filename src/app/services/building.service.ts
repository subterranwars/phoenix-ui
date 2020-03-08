import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from '../model/Token';
import {Player} from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient) { }

  listBuildings() {
    return this.http.get('/constructions');
  }

  build(player: Player, buildingId: any) {
    return this.http.post(`/constructions?playerId=${player.getId()}&buildingId=${buildingId}`, null)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
