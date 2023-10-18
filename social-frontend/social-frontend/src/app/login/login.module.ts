import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { DividerModule } from 'primeng/divider';
import {ButtonModule} from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/autenticacao.guard';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    DividerModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [HttpClient]
})
export class LoginModule { }
