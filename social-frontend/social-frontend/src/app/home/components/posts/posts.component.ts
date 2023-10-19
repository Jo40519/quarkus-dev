import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
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
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements AfterViewInit {
  usuarioLogado!: User;
  constructor(
    private postService: PostsService,
    private authService: AuthService,
    private router: Router,
    private codigoSerivce: CodigoService
  ) {}

  @Input({ required: true }) userSeguindo!: any;
  listPosts: Array<PostResponse> = [];
  @Input() indexUser!: number;
  listaDePosts: Array<PostResponse> = [];

  async ngAfterViewInit() {
    this.usuarioLogado = { ...this.authService.usuarioLogado };
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
  }

  ordenaPostsRecentesAntigos(listaDePosts: Array<PostResponse>) {
    listaDePosts.sort((a, b) => {
      const dateA = new Date(a.date_time).getTime();
      const dateB = new Date(b.date_time).getTime();
      return dateB - dateA;
    });
  }

  verDados(dadosUser: User) {
    console.log(dadosUser);
    this.codigoSerivce.dadosPerfilUsuario = dadosUser;
    this.router.navigate(['perfil-seguidores'])
  }
}
