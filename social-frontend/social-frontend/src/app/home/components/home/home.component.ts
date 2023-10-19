import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { FollowerResponse } from 'src/app/models/follower-response';
import { FollowService } from 'src/app/shared/services/follow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  userSeguindo!: FollowerResponse
  indexUser!: number

  constructor(private followService: FollowService, private authService: AuthService) {}
  async ngOnInit() {
    this.userSeguindo = await this.followService.listaSeguidores(this.authService.usuarioLogado.id)
    console.log('SEGUIDORES =>', this.userSeguindo)
    this.userSeguindo.content.forEach((_, index) => {
      this.indexUser = index;
    })
  }

}
