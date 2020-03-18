import {Injectable} from '@angular/core';
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
import {Progress} from '../model/events/Progress';
import {WebSocketService} from './websocket.service';
import {AuthService} from './auth.service';
import {ResearchGameEvent} from '../model/events/ResearchGameEvent';
import {Research} from '../model/Research';
import {ResearchLevel} from '../model/ResearchLevel';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  // tslint:disable-next-line:variable-name
  private _player: BehaviorSubject<Player> = new BehaviorSubject(new Player(-1, 'dummy'));

  private player: Observable<Player> = this._player.asObservable();

  constructor(private webSocketService: WebSocketService, authService: AuthService) {
    const stompClient = this.webSocketService.connect();
    stompClient.connect({
      Authorization: 'Bearer ' + authService.currentToken.token
    }, () => {
      stompClient.subscribe('/user/updates', success => {
        this.update(JSON.parse(success.body));
      }, error => {
        console.log('ERROR', error);
      });
    });

  }

   getPlayer(): Observable<Player> {
    return this.player;
  }

  refresh() {
    return this.getPlayer();
  }

  private update(playerJson: any) {
    console.log('Player State', playerJson);
    const player = new Player(playerJson.id, playerJson.name);
    const resourceDepots = playerJson.resourceProductions.map(rp => {
      return new ResourceDepot(rp.storage.amount, rp.storage.capacity, rp.resourceProduction.productionPerTimeUnit, rp.resource);
    });
    player.setResourceDepots(resourceDepots);
    const events = playerJson.events.map(e => {
      if (e.type === 'construction') {
        return new ConstructionGameEvent(
          new Building(e.building.id, e.building.label),
          e.level,
          new Progress(e.progress.indeterminate, e.progress.value, e.progress.duration.milliseconds));
      }
      if (e.type === 'resource-search') {
        return new ResourceSearchGameEvent(
          new Resource(e.resource.id, e.resource.name, e.resource.label),
          new Progress(e.progress.indeterminate, e.progress.value, e.progress.duration.milliseconds));
      }
      if (e.type === 'research') {
        return new ResearchGameEvent(
          new Research(e.research.id, e.research.label),
          e.level,
          new Progress(e.progress.indeterminate, e.progress.value, e.progress.duration.milliseconds));
      }
    });
    player.setEvents(events);
    const buildings = playerJson.buildings.map(b => {
      return new BuildingLevel(new Building(b.building.id, b.building.label), b.level);
    });
    player.setBuildings(buildings);
    const researchs = playerJson.researchs.map(r => {
      return new ResearchLevel(new Research(r.research.id, r.research.label), r.level);
    });
    player.setResearchs(researchs);
    const sites = playerJson.resourceSites.map(site => {
      return new ResourceSite(site.id, site.storage.resource, site.storage.amount, site.storage.capacity, site.droneCount);
    });
    player.setResourceSites(sites);
    player.setEnergy(playerJson.energy.production.productionPerTimeUnit);
    player.setTotalDroneCount(playerJson.totalDroneCount);

    this._player.next(player);
  }
}
