import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { PesquisaUsuarioForm } from '../../models/pesquisa-usuario-form';
import { Router } from '@angular/router';
import { CodigoService } from '../../services/codigo.service';
import { FollowService } from '../../services/follow.service';
import { ThemeService } from '../../services/theme.service';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-pesquisar-usuarios',
  templateUrl: './pesquisar-usuarios.component.html',
  styleUrls: ['./pesquisar-usuarios.component.scss'],
})
export class PesquisarUsuariosComponent implements OnInit {
  listaFiltrada: Array<User> = [];
  listaUsuario: Array<User> = [];
  usuarioSelecionado!: User;
  formPesquisar = new FormGroup<PesquisaUsuarioForm>({
    nameUsuario: new FormControl('', { nonNullable: true }),
  });

  indicaTheme!:boolean

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private codigoService: CodigoService,
    private followService: FollowService,
    private themeService: ThemeService
  ) {}

  async ngOnInit() {
    this.listaUsuario = await this.listaTodosUsarios();
    console.log('LISTA USUARIOS AQUI ==>', this.listaUsuario);
  }

  private async listaTodosUsarios() {
    return firstValueFrom(
      this.httpClient.get<Array<User>>('http://localhost:8080/users')
    );
  }

  onSearch(textoPesquisa: AutoCompleteCompleteEvent) {
    let filtered: User[] = [];
    let query = textoPesquisa.query;

    for (let i = 0; i < (this.listaUsuario as User[]).length; i++) {
      let user = (this.listaUsuario as User[])[i];
      if (user.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(user);
      }
    }
    console.log(textoPesquisa);

    this.listaFiltrada = filtered;
    console.log(this.listaFiltrada);
    console.log(this.usuarioSelecionado);
  }

  async irParaPerfil(dadosUser: User) {
    console.log(dadosUser);
    this.codigoService.dadosPerfilUsuario = dadosUser;
    const resposta = await this.followService.listaSeguindo(dadosUser.id);
    this.codigoService.seguidoresDoPerfilUsuario = resposta;
    this.router.navigate(['perfil-seguidores']);
  }

  changeTheme(theme: string) {
    if(this.indicaTheme) {
      this.themeService.changeTheme(theme)

    } else {
      this.themeService.changeTheme('lara-light-blue')
    }
  }
}
