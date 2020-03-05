import {GameEventType} from './GameEventType';
import {GameEvent} from './GameEvent';
import {Building} from './Building';

export class ConstructionGameEvent extends GameEvent {
  public building: Building;
  public level: number;

  constructor(building: Building, level: number, completedInSeconds: number) {
    super(GameEventType.Construction, completedInSeconds, 'Gebäudebau: ' + building.label + ' (Stufe: ' + level + ' )');
    this.level = level;
    this.building = building;
  }
}
