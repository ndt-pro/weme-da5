import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUpload } from 'primeng/fileupload';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth.service';
import { FileService } from 'src/app/_services/file.service';
import { NewfeedsService } from 'src/app/_services/newfeeds.service';
import { SocketService } from 'src/app/_services/socket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  loading: boolean;
  loadingUserLikes: boolean;
  submitted: boolean;
  newfeeds: any[];
  newfeedsLike: any[];
  modal: boolean;
  modalUserLikes: boolean;
  
  @ViewChild(FileUpload, { static: false }) fileupload: FileUpload;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private fileService: FileService,
    private alert: AlertService,
    private newfeedsService: NewfeedsService,
    private el: ElementRef,
    public socket: SocketService
  ) { }

  ngOnInit(): void {
    this.getNewfeed();
    this.form = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  get user() {
    return this.authService.userValue;
  }

  get f() {
    return this.form.controls;
  }

  getNewfeed() {
    this.newfeedsService.getNewfeed(this.user.id)
    .subscribe(res => {
      this.newfeeds = res;
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.closeModal();
    setTimeout(() => {
      this.loading = true;
  
      this.fileService.getEncodeFromImagesBase64(this.fileupload.files)
      .then(data => {
        let formData = {
          idUser:  this.user.id,
          content: this.form.value.content,
          media: data
        };
  
        this.newfeedsService.post(formData)
        .subscribe(res => {
          this.loading = false;
          this.alert.success("Đăng tải trạng thái thành công.");
          this.getNewfeed();
        }, err => {
          this.loading = false;
          this.alert.error("Đăng tải trạng thái thất bại.");
        });
      });
    }, 400);
  }

  onLike(post) {
    this.newfeedsService.like(post.id, this.user.id).toPromise()
    .then((res: any) => {
      if(res.isLike) {
        post.countLike++;
        post.liked = true;
      } else {
        post.countLike--;
        post.liked = false;
      }
    });
  }

  onDelete(post) {
    this.alert.delete("Bạn có thật sự muốn xóa bài viết này?", () => {
      this.loading = true;
      this.newfeedsService.delete(post.id, this.user.id).toPromise()
      .then(res => {
        this.loading = false;
        this.alert.successCallback("Đã xóa bài viết thành công!", () => {
          this.getNewfeed();
        });
      })
      .catch(err => {
        this.loading = false;
        this.alert.error("Không thể thực hiện thao tác: " + err);
      });
    });
  }

  openModal() {
    this.form.patchValue({
      content: ''
    });
    this.fileupload.clear();
    this.modal = true;
    setTimeout(() => {
      this.el.nativeElement.querySelector('[formControlName="content"]').focus();
    }, 250);
  }

  closeModal() {
    this.modal = false;
  }

  openModalUserLikes(post) {
    this.modalUserLikes = true;
    this.loadingUserLikes = true;
    this.newfeedsLike = [];

    this.newfeedsService.getUserLikes(post.id).toPromise()
    .then(res => {
      this.newfeedsLike = res;
      this.loadingUserLikes = false;
    })
    .catch(err => {
      this.loadingUserLikes = false;
    });
  }

  closeModalUserLikes() {
    this.modalUserLikes = false;
    this.loadingUserLikes = false;
  }

}
