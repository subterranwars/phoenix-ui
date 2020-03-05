import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  buildingLevels$;
  private user: User;

  constructor(private buildingService: BuildingService, private userService: UserService) { }

  ngOnInit(): void {
    this.buildingLevels$ = this.buildingService.getBuildings();
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  build(buildingLevel) {
    this.buildingService.build(this.user, buildingLevel.building.id);
  }

  keys(costs: any) {
    return Object.keys(costs);
  }
}
