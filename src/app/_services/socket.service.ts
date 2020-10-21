import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
    list_online: any[];
    _KEY = {
        ON: '1',
        SEND_MESSAGE: '2',
    };

    constructor(
        private socket: Socket,
        private authService: AuthService
    ) {
        this.getOn().subscribe(res => {
            this.list_online = res.filter(user => user.id != this.authService.userValue.id);
        });
    }

    on() {
        this.socket.emit(this._KEY.ON, this.authService.userValue);
    }

    getOn() {
        return this.socket.fromEvent<any>(this._KEY.ON).pipe(map(res => res));
    }

    sendMessage(to_id, message) {
        this.socket.emit(this._KEY.SEND_MESSAGE, {
            from: this.authService.userValue,
            to_id: to_id,
            content: message
        });
    }

    getMessage() {
        return this.socket.fromEvent<any>(this._KEY.SEND_MESSAGE).pipe(map(res => res));
    }
}