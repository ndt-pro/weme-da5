import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_model/user';
import { AuthService } from 'src/app/_services/auth.service';
import { SocketService } from 'src/app/_services/socket.service';
declare var $: any;

@Component({
  selector: 'app-ds-online',
  templateUrl: './ds-online.component.html',
  styleUrls: ['./ds-online.component.css']
})
export class DsOnlineComponent implements OnInit {

  constructor(
    public socket: SocketService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  openModalMessage(user) {
    let modal = $("#modalSendMessage");
    modal.find("#to_user_id").val(user.id);
    modal.find("#to_user_name").val(user.fullName);
    modal.modal("show");
  }

}
