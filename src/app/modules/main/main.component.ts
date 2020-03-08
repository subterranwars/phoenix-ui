import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  player: Player;

  constructor(private playerService: PlayerService, private authService: AuthService) {}

  ngOnInit(): void {
    this.refresh();
  }

  logout() {
    this.authService.logout();
  }

  refresh() {
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }
}
