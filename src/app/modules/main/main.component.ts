import { Component, OnInit } from '@angular/core';
import {ResourceDepot} from '../../model/ResourceDepot';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  player: any;
  resources: any[];
  private state: any;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.refresh();
  }

  logout() {
    this.authService.logout();
  }

  refresh() {
    this.userService.getState().subscribe((playerState) => {
      console.log('Player State', playerState);
      this.state = playerState;
      this.player = playerState;
      this.resources = this.player.resourceProductions.map(rp => {
            return new ResourceDepot(rp.storage.amount, rp.storage.capacity, rp.productionValue, rp.storage.resource);
      });
    });
  }
}
