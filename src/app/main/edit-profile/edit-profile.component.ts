import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { FileUpload } from 'primeng/fileupload';
import { User } from 'src/app/_model/user';
import { AlertService } from 'src/app/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  submitted: boolean;
  user: User;
  
  @ViewChild(FileUpload, { static: false }) file_avatar: FileUpload;

  constructor(
    private formBuilder: FormBuilder,
    public authService: AuthService,
    private userService: UserService,
    private alert: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    this.user = this.authService.userValue;
    
    this.form = this.formBuilder.group({
      full_name: [this.user.fullName, [Validators.required]],
      phone_number: [this.user.phoneNumber, [Validators.required, Validators.pattern('^(0)[0-9]{9}$')]],
      address: [this.user.address, Validators.required]
    });
  }

  get f() {
    return this.form.controls;
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid || !this.file_avatar.hasFiles()) {
      return;
    }

    this.loading = true;

    let val = this.form.value;

    let file = this.file_avatar.files[0];

    const formData = new FormData();
    formData.append('FullName', val.full_name);
    formData.append('PhoneNumber', val.phone_number);
    formData.append('Address', val.address);
    formData.append('Avatar', file, file.name);

    this.userService.update(this.authService.userValue.id, formData).toPromise()
    .then(res => {
      this.loading = false;
      this.alert.success("Đã sửa thông tin thành công!");
      location.reload();
    })
    .catch(err => {
      this.loading = false;
      this.alert.success(err);
    });
  }

}
