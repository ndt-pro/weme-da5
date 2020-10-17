import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { FileUpload } from 'primeng/fileupload';
import { User } from 'src/app/_model/user';

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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    document.body.scrollTop = 0;
    this.user = this.authService.userValue;
    
    this.form = this.formBuilder.group({
      full_name: [this.user.fullName, [Validators.required]],
      phone_number: [this.user.phoneNumber, Validators.required],
      address: [this.user.address, Validators.required]
    });
  }

  logout() {
    this.authService.logout();
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    let val = this.form.value;

    // let data = {
    //   FullName: val.full_name,
    //   PhoneNumber: val.phone_number,
    //   Address: val.address,
    //   Avatar: this.file
    // };

    // let formData = new FormData();
    // formData.append('FullName', val.full_name);
    // formData.append('PhoneNumber', val.phone_number);
    // formData.append('Address', val.address);

    // console.log(this.file_avatar.files[0]);

    let file = this.file_avatar.files[0];

    const formData = new FormData();
    formData.append('FullName', val.full_name);
    formData.append('PhoneNumber', val.phone_number);
    formData.append('Address', val.address);
    formData.append('Avatar', file, file.name);

    this.userService.update(this.authService.userValue.id, formData).toPromise()
    .then(res => console.log(res))
    .catch(err => console.error(err));
  }

}
