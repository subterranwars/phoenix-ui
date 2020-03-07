import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

}
