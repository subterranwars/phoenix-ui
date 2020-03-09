import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from '../model/Token';
import {Player} from '../model/Player';
import {PlayerService} from './player.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor(private http: HttpClient, private playerService: PlayerService) { }

  listBuildings() {
    return this.http.get('/constructions');
  }

  build(player: Player, buildingId: any) {
    return this.http.post(`/constructions?buildingId=${buildingId}`, null)
      .subscribe((response) => {
        console.log(response);
        this.playerService.refresh();
      });
  }
}
