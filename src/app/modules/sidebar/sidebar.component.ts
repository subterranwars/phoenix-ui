import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import {Player} from '../../model/Player';
import {PlayerService} from '../../services/player.service';
import {AuthService} from '../../services/auth.service';
// import { MenusService } from './menus.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {
  menus = [];
  player: Player;

  constructor(public sidebarservice: SidebarService, private playerService: PlayerService, private authService: AuthService) {
    this.menus = sidebarservice.getMenuList();
  }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

  logout() {
    this.authService.logout();
  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  getState(currentMenu) {
    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }
}
