import {GameEventType} from './GameEventType';
import {GameEvent} from './GameEvent';
import {Building} from '../Building';
import {Resource} from '../Resource';
import {Progress} from './Progress';

export class ResourceSearchGameEvent extends GameEvent {
  public resource: Resource;

  constructor(resource: Resource, progress: Progress) {
    super(GameEventType.ResourceSearch,
      progress,
      'Vorkommenssuche: ' + resource.label);
    this.resource = resource;
  }
}
