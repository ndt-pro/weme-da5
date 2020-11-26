import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
    list_online: any[];
    _KEY = {
        ON: '1',
        SEND_MESSAGE: '2',
        SEE_MESSAGE: '3',
        NOTIFICATION: '4',
    };

    constructor(
        private socket: Socket,
        private authService: AuthService,
        private messageService: MessageService
    ) {
        this.getOn().subscribe(res => {
            this.list_online = res.filter(user => user.id != this.authService.userValue.id);
            
        });
    }

    readMessage = (res): boolean => {
        this.initReadMessage(res);
        return true;
    }

    initReadMessage(res) {
        let newMsg = this.messageService.newMessage.filter(mess => {
            return mess.to_user_id != res.from_user.id;
        });

        if(newMsg.length == 0) {
            this.messageService.newMessage.push({ to_user_id: res.from_user.id });
        }
    }

    on() {
        this.socket.emit(this._KEY.ON, this.authService.userValue);
    }

    getOn() {
        return this.socket.fromEvent<any>(this._KEY.ON).pipe(map(res => res));
    }

    sendMessage(toId, message, media) {
        this.socket.emit(this._KEY.SEND_MESSAGE, {
            from_user: this.authService.userValue,
            to_id: toId,
            content: message,
            media: media,
        });
    }

    seenMessage(toId) {
        this.socket.emit(this._KEY.SEE_MESSAGE, {
            from_user_id: this.authService.userValue.id,
            to_user_id: toId
        });
    }

    getMessage() {
        return this.socket.fromEvent<any>(this._KEY.SEND_MESSAGE)
    }

    getSeenMessage() {
        return this.socket.fromEvent<any>(this._KEY.SEE_MESSAGE);
    }

    getNotification() {
        return this.socket.fromEvent<any>(this._KEY.NOTIFICATION);
    }

    pushNotification(data) {
        this.socket.emit(this._KEY.NOTIFICATION, data);
    }

    checkStatus(id): boolean {
        if(id == this.authService.userValue.id)
            return true;
            
        if(this.list_online) {
            return this.list_online.filter(user => user.id == id).length > 0;
        }
    }
}