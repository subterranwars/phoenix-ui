import {Injectable} from '@angular/core';
import {Token} from '../model/Token';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Player} from '../model/Player';
import {ConstructionGameEvent} from '../model/events/ConstructionGameEvent';
import {Building} from '../model/Building';
import {BuildingLevel} from '../model/BuildingLevel';
import {ResourceSearchGameEvent} from '../model/events/ResourceSearchGameEvent';
import {Resource} from '../model/Resource';
import {ResourceDepot} from '../model/ResourceDepot';
import {ResourceSite} from '../model/ResourceSite';

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
          if (e.type === 'resource-search') {
            return new ResourceSearchGameEvent(
              new Resource(e.resource.id, e.resource.name, e.resource.label), e.durationInHours, e.completedInSeconds);
          }
      });
      player.setEvents(events);
      const buildings = playerJson.buildings.map(b => {
        return new BuildingLevel(new Building(b.building.id, b.building.label), b.level);
      });
      player.setBuildings(buildings);

      const sites = playerJson.resourceSites.map(site => {
        return new ResourceSite(site.id, site.storage.resource, site.storage.amount, site.storage.capacity, site.droneCount);
      });
      player.setResourceSites(sites);

      this._player.next(player);
    });
    return this.player;
  }

  refresh() {
    return this.getPlayer();
  }
}
