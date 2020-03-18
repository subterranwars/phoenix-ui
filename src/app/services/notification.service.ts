import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class NotificationService {
	constructor(private http: HttpClient) { }

	delete(notificationId: number) {
		console.log("Deleting: notification " + notificationId);
		return this.http.delete(`/notifications?notificationId=${notificationId}`);
	}

	markAsRead(notificationId: number) {
		console.log("Mark as Read: notification " + notificationId);
		return this.http.put(`/notifications?notificationId=${notificationId}&read=true`, null);
	}
}