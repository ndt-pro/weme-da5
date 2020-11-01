import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid: string;
  user_view: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    this.uid = this.route.snapshot.params['uid'];

    if(this.uid) {
      this.userService.getById(this.uid).toPromise()
      .then(res => {
        this.user_view = res;
      })
      .catch(err => console.error(err));
    } else {
      this.user_view = this.authService.userValue;
    }
  }

}
