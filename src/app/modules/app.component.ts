import {Component, OnInit} from '@angular/core';
import {GameService} from '../services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  private state;
  private players: any[];
  currentPlayer: any;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getState().subscribe((state) => {
      this.players = [];
      this.state = state;
      this.players = this.state.playerStates.map(item => {
        return {
          id: item.id,
          name: item.name
        };
      });
      this.currentPlayer = this.players[0];
    });
  }

  onPlayerChange(event) {
    console.log(event);
  }
}
