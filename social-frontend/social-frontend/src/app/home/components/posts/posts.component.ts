import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { FollowerResponse } from 'src/app/models/follower-response';
import { PostResponse } from 'src/app/models/post-response';
import { User } from 'src/app/models/user';
import { CodigoService } from 'src/app/shared/services/codigo.service';
import { FollowService } from 'src/app/shared/services/follow.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements AfterViewInit, OnChanges {
  usuarioLogado!: User;
  @Input({ required: true }) userSeguindo!: any;
  listPosts: Array<PostResponse> = [];
  @Input() indexUser!: number;
  listaDePosts: Array<PostResponse> = [];
  @Input() indicaAtualizarListaPosts!:boolean;
  @Output() indicaAtualizarListaPostsChange = new EventEmitter<boolean>();
  constructor(
    private postService: PostsService,
    private authService: AuthService,
    private router: Router,
    private codigoSerivce: CodigoService,
    private followService: FollowService
  ) {}
  async ngOnChanges(changes: SimpleChanges) {
    if(changes['indicaAtualizarListaPosts'] && changes['indicaAtualizarListaPosts'].currentValue === true) {
      await this.listaPosts();
    }
  }

  async ngAfterViewInit() {
    this.usuarioLogado = { ...this.authService.usuarioLogado };
    await this.listaPosts();
  }
  
  async listaPosts() {
    await this.listarPropriosPosts();
    this.userSeguindo.content.forEach(async (_: any, index: number) => {
      this.listPosts = await this.postService.listaPosts(
        this.userSeguindo.content[index].follower.id,
        this.usuarioLogado.id
      );
      this.listPosts.forEach((post) => {
        this.listaDePosts.push(post);
      });
      this.ordenaPostsRecentesAntigos(this.listaDePosts);
    });
    this.indicaAtualizarListaPostsChange.emit(false);
  }

  ordenaPostsRecentesAntigos(listaDePosts: Array<PostResponse>) {
    listaDePosts.sort((a, b) => {
      const dateA = new Date(a.date_time).getTime();
      const dateB = new Date(b.date_time).getTime();
      return dateB - dateA;
    });
  }

  async verDados(dadosUser: User, indexPerfil: number) {
    console.log(dadosUser);
    this.codigoSerivce.dadosPerfilUsuario = dadosUser;
    const resposta = await this.followService.listaSeguindo(dadosUser.id);
    this.codigoSerivce.seguidoresDoPerfilUsuario = resposta;
    this.router.navigate(['perfil-seguidores']);
  }

  async listarPropriosPosts() {
    this.listPosts = await this.postService.listaPosts(
      this.authService.usuarioLogado.id,
      this.authService.usuarioLogado.id
    );
    this.listPosts.forEach((posts) => {
      this.listaDePosts.push(posts)
    })
  }
}
