import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CodigoService } from 'src/app/shared/services/codigo.service';

@Component({
  selector: 'app-perfil-seguidores',
  templateUrl: './perfil-seguidores.component.html',
  styleUrls: ['./perfil-seguidores.component.scss'],
  standalone: true,
  imports: [CardModule, ButtonModule, RouterModule]
})
export class PerfilSeguidoresComponent implements OnInit {

  constructor (public codigoService: CodigoService) {}
  ngOnInit(): void {
    console.log('ESTOU NO PERFIL', this.codigoService.dadosPerfilUsuario)
  }

}
