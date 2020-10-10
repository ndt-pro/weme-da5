import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../_model/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '/src/assets/login-page/vendor/bootstrap/css/bootstrap.min.css',
    '/src/assets/login-page/vendor/animate/animate.css',
    '/src/assets/login-page/vendor/css-hamburgers/hamburgers.min.css',
    '/src/assets/login-page/vendor/animsition/css/animsition.min.css',
    '/src/assets/login-page/css/util.css',
    '/src/assets/login-page/css/main.css',
    '/src/assets/login-page/fonts/font-awesome-4.7.0/css/font-awesome.min.css'
  ]
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      pass: ['', Validators.required],
      pass_confirm: ['', Validators.required],
    });
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let val = this.form.value;

    let user = {
      Email: val.email,
      Password: val.pass,
      FullName: val.full_name,
      PhoneNumber: val.phone_number,
      Address: "Mặc định",
    };

    this.userService.create(user).toPromise()
    .then(user => {
      this.loading = false;
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký tài khoản thành công. Bạn có muốn đăng nhập?',
        showCancelButton: true,
        confirmButtonText: 'Đăng nhập',
        cancelButtonText: 'Quay lại',
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      })
    })
    .catch(err => {
      this.loading = false;
      console.error(err);
    });
  }

}