import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';

const baseUrl = environment.apiUrl + "Users";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    public get getAvatar() {
        return environment.avatarUrl + this.userValue.avatar;
    }

    public getAvatarUser(user: User) {
        return environment.avatarUrl + user.avatar;
    }

    register(data) {
        return this._http.post(baseUrl + "/register", data, { headers: environment.headerOptions });
    }

    login(email: string, password: string) {
        return this._http.post<any>(baseUrl + "/login", {
            Email: email,
            Password: password
        }, { headers: environment.headerOptions })
        .pipe(map(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.userSubject.next(user);
            return user;
        }));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this._router.navigate(['/login']);
    }
}
