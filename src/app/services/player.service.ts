import {Injectable} from '@angular/core';
import {Token} from '../model/Token';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ResourceDepot} from '../model/ResourceDepot';
import {Player} from '../model/Player';
import {ConstructionGameEvent} from '../model/ConstructionGameEvent';
import {Building} from '../model/Building';
import {BuildingLevel} from '../model/BuildingLevel';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // tslint:disable-next-line:variable-name
  private _player: BehaviorSubject<Player> = new BehaviorSubject(new Player(-1, 'dummy'));

  private player: Observable<Player> = this._player.asObservable();

  constructor(private http: HttpClient) { }

   getPlayer(): Observable<Player> {
    this.http.get(`players/state`).subscribe((playerJson: any) => {
      console.log('Player State', playerJson);
      const player = new Player(playerJson.id, playerJson.name);
      const resourceDepots = playerJson.resourceProductions.map(rp => {
        return new ResourceDepot(rp.storage.amount, rp.storage.capacity, rp.productionValue, rp.storage.resource);
      });
      player.setResourceDepots(resourceDepots);
      const events = playerJson.events.map(e => {
          if (e.type === 'construction') {
            return new ConstructionGameEvent(new Building(e.building.id, e.building.label), e.level, e.completedInSeconds);
          }
      });
      player.setEvents(events);
      const buildings = playerJson.buildings.map(b => {
        return new BuildingLevel(new Building(b.building.id, b.building.label), b.level);
      });
      player.setBuildings(buildings);
      this._player.next(player);
    });
    return this.player;
  }

  refresh() {
    return this.getPlayer();
  }
}
