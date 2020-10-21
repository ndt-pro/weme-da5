import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../_model/user';

const baseUrl = environment.apiUrl + "Messages/";

@Injectable({
  providedIn: 'root'
})

export class MessageService {
    constructor(
        private _http: HttpClient
    ) { }

    getMessageBox(user_id) {
        return this._http
            .get<any>(baseUrl + "get-mess-box/" + user_id, { headers: environment.headerOptions });
    }

    getAllMessage(from_id, to_id) {
        let params = new HttpParams()
        .set('from_id', from_id)
        .set('to_id', to_id);

        return this._http
            .get<any>(baseUrl + "get-all-mess", { headers: environment.headerOptions, params: params});
    }
}
