import {GameEventType} from './GameEventType';

export class GameEvent {
  constructor(public type: GameEventType, public completedInSeconds: number, public label: string) {}
}
