import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { MessageService } from 'src/app/_services/message.service';
import { SocketService } from 'src/app/_services/socket.service';
declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  form: FormGroup;
  mess_box: any[];
  user_focus: any;
  mess_focus: any[];

  constructor(
    private formBuilder: FormBuilder,
    private socket: SocketService,
    private authService: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    let inner = $(".main_content_inner");
    inner.addClass("pt-0");
    inner.css({
      'max-width': '1300px'
    });


    this.messageService.getMessageBox(this.authService.userValue.id)
    .subscribe(res => {
      this.mess_box = res;

      if(this.mess_box.length > 0) this.getAllMessage(this.mess_box[0]);
    });
    
    this.form = this.formBuilder.group({
      content: ['', Validators.required]
    });

    // lắng nghe người gửi tin nhắn từ socket
    this.socket.getMessage().subscribe(res => {
      res.to = {
        avatar: this.authService.userValue.avatar,
        name: this.authService.userValue.fullName
      };
      
      this.mess_focus.push(res);
      this.autoScroll();
    });
  }

  
  ngOnDestroy(): void {
    let inner = $(".main_content_inner");
    inner.removeClass("pt-0");
    inner.css({
      'max-width': ''
    });
  }

  getAllMessage(inbox) {
    this.user_focus = inbox;
    this.messageService.getAllMessage(this.authService.userValue.id, inbox.to_id)
    .subscribe(res => {
      this.mess_focus = res;
    });
    setTimeout(() => {
      this.autoScroll();
    }, 700);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.socket.sendMessage(this.user_focus.to_id, this.form.value.content);

    let mess = {
      from_id: this.authService.userValue.id,
      to_id: this.user_focus.to_id,
      content: this.form.value.content,
      from: {
        avatar: this.authService.userValue.avatar,
        name: this.authService.userValue.fullName
      },
      to: {
        avatar: this.user_focus.avatar,
        name: this.user_focus.to_name
      }
    };

    this.mess_focus.push(mess);
    this.form.patchValue({ content: '' });
    this.autoScroll();
  }

  autoScroll() {
    let container = $('#message-content'),
        scrollTo = $('#scroll-to-bottom');

    container.animate({
        scrollTop: scrollTo.offset().top - container.offset().top + container.scrollTop()
    });
  }

  checkStatus(userbox): boolean {
    return this.socket.checkStatus(userbox.to_id);
  }

}