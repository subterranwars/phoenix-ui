import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources;

  constructor(private resourceService: ResourceService) {
  }

  ngOnInit(): void {
    this.resources = this.resourceService.resourceDepots;
  }

}
