import {GameEventType} from './GameEventType';
import {GameEvent} from './GameEvent';
import {Building} from '../Building';
import {Resource} from '../Resource';

export class ResourceSearchGameEvent extends GameEvent {
  public resource: Resource;
  public durationInHours: number;

  constructor(resource: Resource, durationInHours: number, completedInSeconds: number) {
    super(GameEventType.ResourceSearch,
      completedInSeconds,
      'Vorkommenssuche: ' + resource.label + ' (Dauer: ' + durationInHours + ' Stunde(n))');
    this.resource = resource;
    this.durationInHours = durationInHours;
  }
}
