import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Player } from '../../model/Player';

@Component({
	selector: 'app-messages',
	templateUrl: './notifications.component.html',
	styleUrls: ['./notifications.component.scss']
})
export class NotificationComponent implements OnInit {
	player: Player;

	constructor(private playerService: PlayerService) { }

	ngOnInit(): void {
		this.playerService.getPlayer().subscribe((player: Player) => {
			this.player = player;
		});
	}

	deleteNotification(id: number): void {

	}
	
	markAsRead(id: number) : void {
		
	}
}