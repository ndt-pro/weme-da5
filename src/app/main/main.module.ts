import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainComponent } from './main.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { ChatComponent } from './chat/chat.component';
import { DsOnlineComponent } from './home/ds-online/ds-online.component';
import { TinNhanComponent } from './layout/header/tin-nhan/tin-nhan.component';
import { ThongBaoComponent } from './layout/header/thong-bao/thong-bao.component';

export const mainRoutes: Routes = [
  {
      path: '', component: MainComponent,
      children: [
        {
            path: '', component: HomeComponent
        },
        {
            path: 'chat', component: ChatComponent
        },
          // {
          //     path: 'user',  loadChildren: () => import('./user/user.module').then(m => m.UserModule)
          // },
          // {
          //     path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
          // },
      ]
  }
];

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    SidebarComponent,
    HeaderComponent,
    ChatComponent,
    DsOnlineComponent,
    TinNhanComponent,
    ThongBaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule { }
