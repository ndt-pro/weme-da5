import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';

const baseUrl = environment.apiUrl + "Users";

@Injectable({
  providedIn: 'root'
})

export class UserService {
    constructor(private _http: HttpClient) { }

    getAll() {
        return this._http
            .get<User[]>(baseUrl, { headers: environment.headerOptions })
            .pipe(map((res: any) => {
                return res;
            }));
    }

    create(user) {
        return this._http
            .post(baseUrl + "/register", user, { headers: environment.headerOptions })
            .pipe(map((res: any) => {
                return res;
            }));
    }
}
