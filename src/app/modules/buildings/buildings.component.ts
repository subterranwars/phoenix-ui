import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  buildingLevels$;

  constructor(private buildingService: BuildingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.buildingLevels$ = this.buildingService.getBuildings();
  }

  build(buildingLevel) {
    console.log(this.authService.currentUser);
    this.buildingService.build(this.authService.currentUser, buildingLevel.building.id);
  }

  keys(costs: any) {
    return Object.keys(costs);
  }
}
