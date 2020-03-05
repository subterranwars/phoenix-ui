import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.refresh();
  }

  logout() {
    this.authService.logout();
  }

  refresh() {
    this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
  }
}
