import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  constructionInfos$;
  player: Player;

  constructor(private buildingService: BuildingService, private playerService: PlayerService) { }

  ngOnInit(): void {
    this.constructionInfos$ = this.buildingService.listBuildings();
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

  build(buildingLevel) {
    this.buildingService.build(this.player, buildingLevel.building.id);
    this.playerService.refresh();
  }

  keys(costs: any) {
    return Object.keys(costs);
  }
}
