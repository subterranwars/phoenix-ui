import {GameEvent} from './events/GameEvent';
import {ConstructionGameEvent} from './events/ConstructionGameEvent';
import {BuildingLevel} from './BuildingLevel';
import {ResourceDepot} from './ResourceDepot';
import {ResourceSite} from './ResourceSite';
import {GameEventType} from './events/GameEventType';

export class Player {
  private resourceDepots: ResourceDepot[] = [];
  private events: GameEvent[] = [];
  private buildings: BuildingLevel[] = [];
  private resourceSites: ResourceSite[] = [];
  private energy: number;
  private totalDroneCount: number;

  constructor(private id: number, private name: string) {

  }

  setTotalDroneCount(droneCount: number) {
    this.totalDroneCount = droneCount;
  }

  getTotalDroneCount(): number {
    return this.totalDroneCount;
  }

  setResourceDepots(resourceDepots: ResourceDepot[]) {
    this.resourceDepots = resourceDepots;
  }

  setEvents(events: GameEvent[]) {
    this.events = events;
  }

  getEvents() {
    return this.events;
  }

  getResources() {
    return this.resourceDepots;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getResourceSites(): ResourceSite[] {
    return this.resourceSites;
  }

  setResourceSites(value: ResourceSite[]) {
    this.resourceSites = value;
  }

  hasResourceBuilding(): boolean {
    return this.buildings.filter(b => b.building.isResourceBuilding()).length > 0;
  }

  setBuildings(buildings: BuildingLevel[]) {
    this.buildings = buildings;
  }

  isConstructionInProgress(): boolean {
    return this.getConstructionInProgress() != null;
  }

  getConstructionInProgress(): ConstructionGameEvent {
    const constructionEvents = this.events.filter(event => event instanceof ConstructionGameEvent)
                                            .map(event => event as ConstructionGameEvent);
    if (constructionEvents.length > 0) {
      return constructionEvents[0];
    }
    return null;
  }

  setEnergy(productionPerTimeUnit: number) {
    this.energy = productionPerTimeUnit;
  }

  getEnergy() {
    return this.energy;
  }

  getResourceSiteSearches() {
    return this.getEvents().filter(event => {
      return event.type === GameEventType.ResourceSearch;
    });
  }

  getResourceSite(id: number) {
    const resourceSites = this.resourceSites.filter(site => site.id === id);
    if (resourceSites.length === 0) {
      return null;
    }
    return resourceSites[0];
  }
}
