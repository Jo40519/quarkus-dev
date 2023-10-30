import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PostsComponent } from './components/posts/posts.component';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificaService } from '../shared/services/notifica.service';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { MenuModule } from 'primeng/menu';




@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    InputTextareaModule,
    SharedModule,
    HttpClientModule,
    CardModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    MenuModule
  ],
  providers: [HttpClient, NotificaService, MessageService],
  exports:[PostsComponent]
})
export class HomeModule { }
