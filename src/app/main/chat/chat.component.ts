import { Component, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {
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
    this.messageService.getMessageBox(this.authService.userValue.id)
    .subscribe(res => {
      this.mess_box = res;

      if(this.mess_box.length > 0) this.getAllMessage(this.mess_box[0]);
    });
    
    this.form = this.formBuilder.group({
      content: ['', Validators.required]
    });

    this.socket.getMessage().subscribe(res => {
      res.to = {
        avatar: this.authService.userValue.avatar,
        name: this.authService.userValue.fullName
      };
      this.mess_focus.push(res);
      this.autoScroll();
    });
  }

  getAllMessage(inbox) {
    this.user_focus = inbox;
    this.messageService.getAllMessage(this.authService.userValue.id, inbox.to_id)
    .subscribe(res => {
      this.mess_focus = res;
    });
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

    let cc = (scrollTo.offset().top - container.offset().top + container.scrollTop())-20;

    console.log(cc);

    container.animate({
        scrollTop: cc
    });

    // document.getElementById("#message-content").scrollIntoView();
    // alert($("#message-content").height());
    // $("#message-content").scrollTop();
    // $([document.documentElement, document.body]).animate({
    //     scrollTop: $("#message-content").offset().top
    // }, 2000);
  }

}