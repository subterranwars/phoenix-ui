import {GameEventType} from './GameEventType';
import {GameEvent} from './GameEvent';
import {Progress} from './Progress';
import {Research} from '../Research';

export class ResearchGameEvent extends GameEvent {
  public research: Research;
  public level: number;

  constructor(research: Research, level: number, progress: Progress) {
    super(GameEventType.Research, progress, 'Forschung: ' + research.label + ' (Stufe: ' + level + ' )');
    this.level = level;
    this.research = research;
  }
}
