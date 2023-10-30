import {
  AfterViewInit,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardModule } from 'primeng/card';
import { FollowerResponse } from 'src/app/models/follower-response';
import { CodigoService } from 'src/app/shared/services/codigo.service';
import { FollowService } from 'src/app/shared/services/follow.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuItem, MessageService, SharedModule } from 'primeng/api';
import { HomeModule } from 'src/app/home/home.module';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PostResponse } from 'src/app/models/post-response';
import { PostsService } from 'src/app/shared/services/posts.service';
import { User } from 'src/app/models/user';
import { FieldError } from 'src/app/shared/models/field-error';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorsInterceptor } from 'src/app/shared/services/errors.interceptor';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { NotificaService } from 'src/app/shared/services/notifica.service';
import { ToastModule } from 'primeng/toast';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormPosts } from 'src/app/home/models/form-posts';
import { PostRequest } from 'src/app/home/models/post-request';

@Component({
  selector: 'app-perfil-seguidores',
  templateUrl: './perfil-seguidores.component.html',
  styleUrls: ['./perfil-seguidores.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RouterModule,
    ButtonModule,
    SharedModule,
    HomeModule,
    ProgressSpinnerModule,
    MessagesModule,
    MessageModule,
    MenuModule,
    DialogModule,
    ToastModule,
    InputTextareaModule,
    ReactiveFormsModule
  ],
  providers: [
    NotificaService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PerfilSeguidoresComponent implements OnInit {
  seguindo!: FollowerResponse;
  seguidores!: FollowerResponse;
  quantidadeSeguidores!: number;
  usuarioLogado!: any;
  listaDePosts: Array<PostResponse> = [];
  mensagemErro!: FieldError;
  estaSeguindo!: boolean;
  carregando!: boolean;
  dadosPerfilUsuario!: User;
  usuarioSeguindo!: User;
  items: MenuItem[] = [
    {
      icon: 'pi pi-pencil',
      label: 'Editar post',
      command: () => {
        this.abrirModalEditarPost = true;
      },
    },
    {
      label: 'Excluir post',
      icon: 'pi pi-trash',
      command: () => {
        this.abrirModalExcluir = true;
      },
    },
  ];
  abrirModalExcluir = false;
  postId!: number;
  abrirModalEditarPost!: boolean;
  formEditarPost!:FormGroup<FormPosts>;

  constructor(
    public codigoService: CodigoService,
    private followService: FollowService,
    private authSerivce: AuthService,
    private postService: PostsService,
    private notificaService: NotificaService,
    private formBuilder: FormBuilder
  ) {}
  async ngOnInit() {
    
        this.formEditarPost = new FormGroup({
          text: new FormControl('', {nonNullable: true})
        })
    this.usuarioLogado = { ...this.authSerivce.usuarioLogado };
    this.dadosPerfilUsuario = { ...this.codigoService.dadosPerfilUsuario };
    const [listaSeguidores, listaSeguindo, listaPosts] = await Promise.all([
      this.listaSeguidores(),
      this.listaSeguindo(),
      this.listaPosts(),
    ]);

    return { listaSeguidores, listaSeguindo, listaPosts };
  }

  async listaSeguindo() {
    this.seguindo = await this.followService.listaSeguindo(
      this.dadosPerfilUsuario.id
    );
    console.log('SEGUINDO ==>', this.seguindo);
  }

  async listaSeguidores() {
    this.seguidores = await this.followService.listaSeguidores(
      this.dadosPerfilUsuario.id
    );
    const seguidor = this.seguidores.content.find((user: User) => {
      return user.name === this.usuarioLogado.name;
    });

    if (seguidor) {
      this.estaSeguindo = true;
    } else {
      this.estaSeguindo = false;
    }
  }

  async listaPosts() {
    const resposta = await this.postService.listaPosts(
      this.dadosPerfilUsuario.id,
      this.usuarioLogado.id
    );
    this.listaDePosts = resposta;
  }

  async followUser() {
    const resposta = await this.followService.seguirUsuario(
      this.dadosPerfilUsuario.id,
      this.usuarioLogado.id
    );
    this.listaDePosts = [];
    await this.listaSeguidores();
    await this.listaPosts();
  }

  async unfollowUser() {
    const resposta = await this.followService.deixarDeSeguirUsuario(
      this.dadosPerfilUsuario.id,
      this.usuarioLogado.id
    );
    this.listaDePosts = [];
    await this.listaSeguidores();
  }

  abrirModalExcluirPost() {
    this.abrirModalExcluir = true;
  }

  resgataPost(post: PostResponse) {
    console.log(post);
    this.formEditarPost.patchValue({
      text: post.text
    })
    this.postId = post.id;
    console.log('ID DO POST ==>', this.postId);
  }

  async editarPost() {
    const editFormPost: PostRequest = {
      text: this.formEditarPost.get('text')?.value as string
    }
    const resposta = await this.postService.editarPost(
      this.usuarioLogado.id,
      this.postId,
      editFormPost
    )
    if(resposta) {
      console.log('RESPOSTA DO POST EDITADO', resposta)
      this.abrirModalEditarPost = false;
      this.listaPosts();
      this.notificaService.criaSucesso('Post editado com sucesso!', 'Sucesso')
    }
  }

  async deletaPost() {
    const resposta = await this.postService.deletaPosts(
      this.usuarioLogado.id,
      this.postId
    );
    this.abrirModalExcluir = false;
    this.notificaService.criaSucesso('Post excluído com sucesso!', 'Sucesso!');
    await this.listaPosts();
    console.log('RESPOSTA AQUI ==>', resposta);
  }
}
