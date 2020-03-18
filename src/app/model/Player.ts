import {GameEvent} from './events/GameEvent';
import {ConstructionGameEvent} from './events/ConstructionGameEvent';
import {BuildingLevel} from './BuildingLevel';
import {ResourceDepot} from './ResourceDepot';
import {ResourceSite} from './ResourceSite';
import {GameEventType} from './events/GameEventType';
import {Research} from './Research';
import {ResearchGameEvent} from './events/ResearchGameEvent';

export class Player {
  private resourceDepots: ResourceDepot[] = [];
  private events: GameEvent[] = [];
  private buildings: BuildingLevel[] = [];
  private resourceSites: ResourceSite[] = [];
  private energy: number;
  private totalDroneCount: number;
  private researchs: Research[] = [];

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

  hasResearchlab(): boolean {
    return this.buildings.filter(b => b.building.isResearchlab()).length > 0;
  }

  setBuildings(buildings: BuildingLevel[]) {
    this.buildings = buildings;
  }

  setResearchs(researchs: Research[]) {
    this.researchs = researchs;
  }

  getResearchs(): Research[] {
    return this.researchs;
  }

  isConstructionInProgress(): boolean {
    return this.getConstructionInProgress() != null;
  }

  isResearchInProgress(): boolean {
    return this.getResearchInProgress() != null;
  }

  getConstructionInProgress(): ConstructionGameEvent {
    const constructionEvents = this.events.filter(event => event instanceof ConstructionGameEvent)
                                            .map(event => event as ConstructionGameEvent);
    if (constructionEvents.length > 0) {
      return constructionEvents[0];
    }
    return null;
  }

  // TODO MVR identical to getConstructionInProgress() => Is there a more dynamic way of doing this
  getResearchInProgress(): ResearchGameEvent {
    const researchEvents = this.events.filter(event => event instanceof ResearchGameEvent)
                                        .map(event => event as ResearchGameEvent);
    if (researchEvents.length > 0) {
      return researchEvents[0];
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
