import { Component, OnInit } from '@angular/core';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessageComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }
}
