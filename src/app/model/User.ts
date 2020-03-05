import {ResourceDepot} from './ResourceDepot';
import {GameEvent} from './GameEvent';

export class User {
  private resourceDepots: ResourceDepot[] = [];
  private events: GameEvent[] = [];

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
}
