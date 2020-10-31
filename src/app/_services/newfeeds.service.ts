import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const baseUrl = environment.apiUrl + "Newfeeds/";

@Injectable({
  providedIn: 'root'
})

export class NewfeedsService {
    constructor(
        private _http: HttpClient
    ) { }

    getNewfeed(idUser) {
        return this._http
            .get<any[]>(baseUrl + idUser, { headers: environment.headerOptions })
            .pipe(map((res: any[]) => {
                return res.map(data => {
                    data.media = JSON.parse(data.media);
                    return data;
                });
            }));
    }

    getUserLikes(idNewfeed) {
        return this._http
            .get<any[]>(baseUrl + "get-user-likes/" + idNewfeed, { headers: environment.headerOptions });
    }

    post(data) {
        return this._http
            .post(baseUrl + "post-newfeed", data);
    }

    like(idNewfeed, idUser) {
        return this._http
            .post(baseUrl + "like-newfeed", {
                idNewfeed,
                idUser
            });
    }

    delete(idNewfeed, idUser) {
        let params = new HttpParams()
        .set('idPost', idNewfeed)
        .set('idUser', idUser);
        
        return this._http
            .delete(baseUrl, { headers: environment.headerOptions, params: params });
    }
}
