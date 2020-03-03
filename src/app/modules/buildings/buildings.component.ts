import { Component, OnInit } from '@angular/core';
import {BuildingService} from '../../services/building.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  buildings;

  constructor(private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.buildings = this.buildingService.getBuildings();
  }

}
