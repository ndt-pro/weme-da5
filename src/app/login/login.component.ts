import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../_services/alert.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '/src/assets/login-page/vendor/bootstrap/css/bootstrap.min.css',
    '/src/assets/login-page/vendor/animate/animate.css',
    '/src/assets/login-page/vendor/css-hamburgers/hamburgers.min.css',
    '/src/assets/login-page/vendor/animsition/css/animsition.min.css',
    '/src/assets/login-page/css/util.css',
    '/src/assets/login-page/css/main.css',
    '/src/assets/login-page/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
  ]
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alert: AlertService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      if(this.authService.userValue) {
        this.router.navigate(['/']);
      }
    }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['r_url'] || '/';
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let val = this.form.value;

    this.authService.login(val.email, val.pass).toPromise()
    .then(res => {
      this.loading = false;
      this.router.navigate([this.returnUrl]);
    })
    .catch(err => {
      this.loading = false;
      this.alert.error(err);
    });
  }

}
