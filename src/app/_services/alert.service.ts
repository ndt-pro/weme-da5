import { Injectable } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AlertService {
    constructor(private router: Router) { }

    registerSuccess() {
        Swal
        .fire({
            icon: 'success',
            title: 'Đăng ký tài khoản thành công. Bạn có muốn đăng nhập?',
            showCancelButton: true,
            confirmButtonText: 'Đăng nhập',
            cancelButtonText: 'Quay lại',
        })
        .then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['/login']);
            }
        });
    }

    success(message) {
        Swal
        .fire({
            icon: 'success',
            title: 'Thành công',
            text: message
        });
    }

    error(message) {
        Swal
        .fire({
            icon: 'error',
            title: 'Lỗi',
            text: message
        });
    }
}
