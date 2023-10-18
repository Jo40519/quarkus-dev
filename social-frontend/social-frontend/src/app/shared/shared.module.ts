import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    MessagesModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
