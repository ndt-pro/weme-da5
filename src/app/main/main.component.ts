import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../_lib/base.component';
import { FileService } from '../_services/file.service';
import { MessageService } from '../_services/message.service';
import { SocketService } from '../_services/socket.service';
declare var $: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {
  form: FormGroup;

  constructor(
    injector: Injector,
    private socket: SocketService,
    private messageService: MessageService,
    private fileService: FileService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadScripts();
    this.socket.on();
    
    this.form = this.formBuilder.group({
      content: ['', Validators.required]
    });

    // lắng nghe người gửi tin nhắn từ socket
    this.socket.getMessage().subscribe(res => {
      // this.messageService.countNewMessage(this.authService.userValue.id).toPromise()
      // .then(res => {
      //   this.messageService.newMessage = res;
      // });
      if(this.socket.readMessage(res)) {
        this.fileService.playMessageSound();
      }
    });
  }
  
  onSubmit() {
    let to_id = $("#to_user_id").val();
    
    if (this.form.invalid || !to_id) {
      return;
    }

    $("#modalSendMessage").modal("hide");
    this.socket.sendMessage(to_id, this.form.value.content, []);
    setTimeout(() => {
      this.router.navigate(['/chat']);
    }, 500);
  }
}