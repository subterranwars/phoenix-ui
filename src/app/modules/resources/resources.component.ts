import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources;
  player: Player;

  constructor(private resourceService: ResourceService, private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.resources = this.resourceService.resourceDepots;
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

}
