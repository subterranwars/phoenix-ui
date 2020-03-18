import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Token} from '../model/Token';
import {Player} from '../model/Player';
import {PlayerService} from './player.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient, private playerService: PlayerService) { }

  listResearchs() {
    return this.http.get('/researchs');
  }

  research(player: Player, researchId: any) {
    return this.http.post(`/researchs?researchId=${researchId}`, null)
      .subscribe((response) => {
        this.playerService.refresh();
      });
  }
}
