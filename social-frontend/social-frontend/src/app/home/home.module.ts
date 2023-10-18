import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/autenticacao.guard';
import { PostsComponent } from './components/posts/posts.component';
import { CardModule } from 'primeng/card';




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
    CardModule
  ],
  providers: [HttpClient]
})
export class HomeModule { }
