import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from './player.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
	constructor(private http: HttpClient, private playerService: PlayerService) { }

	delete(notificationId: bigint) {
		console.log("Deleting: notification " + notificationId);
		this.http.delete(`/notifications?notificationId=${notificationId}`).subscribe(res => { this.playerService.refresh(); });
	}

	markAsRead(notificationId: bigint) {
		console.log("Mark as Read: notification " + notificationId);
		this.http.patch(`/notifications?notificationId=${notificationId}`, null).subscribe(res => { this.playerService.refresh(); });
	}
}