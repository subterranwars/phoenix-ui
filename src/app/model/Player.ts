import {ResourceDepot} from './ResourceDepot';
import {GameEvent} from './GameEvent';
import {ConstructionGameEvent} from './ConstructionGameEvent';
import {GameEventType} from './GameEventType';
import {BuildingLevel} from './BuildingLevel';

export class Player {
  private resourceDepots: ResourceDepot[] = [];
  private events: GameEvent[] = [];
  private buildings: BuildingLevel[] = [];

  constructor(private id: number, private name: string) {

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
}
