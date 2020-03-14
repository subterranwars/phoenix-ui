import {GameEventType} from './GameEventType';
import {GameEvent} from './GameEvent';
import {Building} from '../Building';
import {Progress} from './Progress';

export class ConstructionGameEvent extends GameEvent {
  public building: Building;
  public level: number;

  constructor(building: Building, level: number, progress: Progress) {
    super(GameEventType.Construction, progress, 'Gebäudebau: ' + building.label + ' (Stufe: ' + level + ' )');
    this.level = level;
    this.building = building;
  }
}
