import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserLoginForm } from '../../models/user-login-form';
import { UserLogin } from '../../models/user-login';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/autenticacao.guard';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  usuario!: User

  constructor(private authService: AuthService, private router: Router) {}

  formLogin = new FormGroup<UserLoginForm>({
    email: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.email]}),
    senha: new FormControl('', {nonNullable: true, validators: [Validators.required]})
  })

  async logar() {
    const params: UserLogin = {
      email: this.formLogin.get('email')?.value!,
      senha: this.formLogin.get('senha')?.value!
    }

    const resposta = await this.authService.sing(params)

    if(resposta) {
      this.authService.autenticado = true
      this.authService.usuarioLogado = resposta
      console.log(this.authService.usuarioLogado)
      this.usuario = resposta
      this.router.navigate(['/home'])
    }
  }

  routeCadastrarUsuario() {
    this.router.navigate(['/cadastrar-usuario'])
  }

}
