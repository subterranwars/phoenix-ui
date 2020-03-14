import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PlayerService} from './player.service';

@Injectable({providedIn: 'root'})
export class ResourceService {
  constructor(private http: HttpClient, private playerService: PlayerService) { }

  search(resourceId: number, hours: number) {
    return this.http
      .post(`/resources?resourceId=${resourceId}&hours=${hours}`, null)
        .subscribe(res => {
          this.playerService.refresh();
        });
  }

  delete(siteId: number) {
    return this.http.delete(`/resources?siteId=${siteId}`);
  }

  updateDroneCount(siteId: number, droneCount: number) {
    return this.http.put(`/resources?siteId=${siteId}&droneCount=${droneCount}`, null);
  }

  listResources() {
    return this.http.get(`/resources`);
  }
}
