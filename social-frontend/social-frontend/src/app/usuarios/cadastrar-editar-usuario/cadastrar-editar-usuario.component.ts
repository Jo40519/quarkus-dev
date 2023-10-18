import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButton, RadioButtonModule } from 'primeng/radiobutton';
import { CodigoService } from 'src/app/shared/services/codigo.service';
import { UsuarioForm } from '../models/usuario-form';
import { UsuarioService } from '../services/usuario.service';
import { User } from 'src/app/models/user';
import { Router, RouterModule } from '@angular/router';
import { NotificaService } from 'src/app/shared/services/notifica.service';
import { MessageService } from 'primeng/api';
import { map, tap, Observable } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-cadastrar-editar-usuario',
  templateUrl: './cadastrar-editar-usuario.component.html',
  styleUrls: ['./cadastrar-editar-usuario.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    RadioButtonModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    MessageModule,
    MessagesModule
  ],
  providers: [NotificaService, MessageService]
})
export class CadastrarEditarUsuarioComponent implements OnInit{
  formCadastrarEditarUsuario = new FormGroup<UsuarioForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    senha: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    age: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    sexo: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  emails!: any;
  usuarios!: Observable<Array<User>>
  emailsRepetidos: Array<User> = [];
  constructor(
    public codigoService: CodigoService,
    private usuarioService: UsuarioService,
    private notificaService: NotificaService,
    private router: Router

  ) {}
  ngOnInit(): void {

  }


  validaEmail() {
    const email = this.formCadastrarEditarUsuario.get('email')?.value!
    this.usuarios = this.usuarioService.verificarEmail(email)
    this.usuarios.forEach((dados) => {
      let emailsRepetidos: Array<User> = [];
        emailsRepetidos = dados.filter(u => u.email === email)
      if(emailsRepetidos.length > 0) {
        this.emailsRepetidos = emailsRepetidos;
        this.notificaService.criaInfo('Email já cadastrado, coloque outro email', 'Info')
      }
    })
  }

  async cadastrarUsuario() {
    if(this.emailsRepetidos.length > 0) {
      this.validaEmail();
    } else if(this.emailsRepetidos.length === 0) {
      const usuario: Omit<User, 'id'> = {
        name: this.formCadastrarEditarUsuario.get('name')?.value!,
        email: this.formCadastrarEditarUsuario.get('email')?.value!,
        senha: this.formCadastrarEditarUsuario.get('senha')?.value!,
        age: this.formCadastrarEditarUsuario.get('age')?.value!,
        sexo: this.formCadastrarEditarUsuario.get('sexo')?.value!,
      };
      const resposta = await this.usuarioService.cadastrarUsuario(usuario);
  
      if (resposta) {
        this.notificaService.criaSucesso('Conta criada com sucesso!', 'Sucesso')
        this.router.navigate(['/login'])
      }
    }
    }
}
