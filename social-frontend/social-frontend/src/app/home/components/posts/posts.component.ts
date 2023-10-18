import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { User } from 'src/app/models/user';
import { FollowService } from 'src/app/shared/services/follow.service';
import { PostsService } from 'src/app/shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  usuarioLogado!: User;
  constructor(private postService: PostsService, private authService: AuthService) {}


  ngOnInit(): void {
    this.usuarioLogado = {... this.authService.usuarioLogado}
    console.log('ID DO USUARIO LOGADO', this.usuarioLogado.id)
    const resposta = this.postService.listaPosts(this.usuarioLogado.id, 9)


    console.log(resposta)
  }

}
