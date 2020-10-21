import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '../_lib/base.component';
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
  }
  
  onSubmit() {
    let to_id = $("#to_user_id").val();
    
    if (this.form.invalid || !to_id) {
      return;
    }

    $("#modalSendMessage").modal("hide");
    this.socket.sendMessage(to_id, this.form.value.content);
    this.router.navigate(['/chat']);
  }
}