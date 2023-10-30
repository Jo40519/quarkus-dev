import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/autenticacao.guard';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  usuario!: User
  indicaTheme!: boolean;
  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    console.log('LOGADO NO SIDEBAR', this.authService.usuarioLogado)
    this.usuario = {... this.authService.usuarioLogado}
  }

  logOut() {
    this.authService.naoAutenticado()
  }
}
