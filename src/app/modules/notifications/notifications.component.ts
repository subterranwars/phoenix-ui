import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {PlayerService} from '../../services/player.service';
import {Player} from '../../model/Player';

@Component({
  selector: 'app-messages',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationComponent implements OnInit {
  player: Player;

  constructor(private playerService: PlayerService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.playerService.getPlayer().subscribe((player: Player) => {
      this.player = player;
    });
  }

  deleteNotification(id: bigint): void {
    this.notificationService.delete(id);
  }

  markAsRead(id: bigint): void {
    this.notificationService.markAsRead(id);
  }
}
