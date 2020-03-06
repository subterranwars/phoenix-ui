import { Component, OnInit } from '@angular/core';
import {ResourceService} from '../../services/resource.service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {
  resources;
  user: User;

  constructor(private resourceService: ResourceService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.resources = this.resourceService.resourceDepots;
    this.userService.getUser().subscribe((u: User) => {
      this.user = u;
    });
  }

}
