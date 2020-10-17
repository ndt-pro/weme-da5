import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  logout() {
    this.authService.logout();
  }

}
