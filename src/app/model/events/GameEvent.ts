import {GameEventType} from './GameEventType';
import {Progress} from './Progress';

export class GameEvent {
  constructor(public type: GameEventType, public progress: Progress, public label: string) {}
}
