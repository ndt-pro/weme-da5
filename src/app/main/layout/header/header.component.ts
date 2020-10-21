import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from 'src/app/_lib/base.component';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  user: User;

  constructor(
    injector: Injector,
    private authService: AuthService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.user = this.authService.userValue;
  }

  logout() {
    this.authService.logout();
  }

}
