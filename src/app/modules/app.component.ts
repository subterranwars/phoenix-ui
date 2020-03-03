import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';
import {ResourceDepot} from '../model/ResourceDepot';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private state;

  title = 'my-app';
  players: any[];
  currentPlayer: any;
  resources: any[];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.refresh();
  }

  onPlayerChange(value) {
    this.updatePlayer(value - 1);
  }

  private updatePlayer(index) {
    this.currentPlayer = this.players[index];
    this.resources = this.state.playerStates[this.currentPlayer.id - 1].resourceProductions.map(rp => {
      return new ResourceDepot(rp.storage.amount, rp.storage.capacity, rp.productionValue, rp.storage.resource);
    });
  }

  refresh() {
    this.gameService.getState().subscribe((state) => {
      this.players = [];
      this.state = state;
      this.players = this.state.playerStates.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
      this.updatePlayer(0);
      console.log(this.state);
    });
  }
}
