import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { FollowerResponse } from 'src/app/models/follower-response';
import { FollowService } from 'src/app/shared/services/follow.service';
import { PostsService } from 'src/app/shared/services/posts.service';
import { FormPosts } from '../../models/form-posts';
import { PostRequest } from '../../models/post-request';
import { NotificaService } from 'src/app/shared/services/notifica.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userSeguindo!: FollowerResponse;
  indexUser!: number;
  formPosts = new FormGroup<FormPosts>({
    text: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(150)]})
  })
  indicaAtualizarListaPosts = false;


  constructor(
    private followService: FollowService,
    private authService: AuthService,
    private postService: PostsService,
    private notificaService: NotificaService
  ) {}
  async ngOnInit() {
    this.userSeguindo = await this.followService.listaSeguindo(
      this.authService.usuarioLogado.id
    );
    console.log('SEGUIDORES =>', this.userSeguindo);
    this.userSeguindo.content.forEach((_, index) => {
      this.indexUser = index;
    });
  }

  async publicarPost() {
    const postRequest: PostRequest = {
      text: this.formPosts.get('text')?.value as string
    }
    const resposta = await this.postService.criarPosts(this.authService.usuarioLogado.id, postRequest);

    if(resposta) {
      this.indicaAtualizarListaPosts = true;
      this.notificaService.criaSucesso('Publicação criada com sucesso!', 'Sucesso!');
      this.formPosts.reset();
    }

  }
}
