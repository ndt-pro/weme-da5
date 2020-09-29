import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from '../lib/base.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
  }

  ngOnInit(): void {
    this.loadScripts();
    let data = this._api.get("/api/LoaiHangsx");
    data.toPromise()
    .then(res => console.log(res))
    .catch(error => console.log(error))
    // console.log(data);
  }
}