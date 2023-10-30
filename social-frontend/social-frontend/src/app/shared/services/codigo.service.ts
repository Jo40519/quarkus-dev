import { Injectable } from '@angular/core';
import { DetalhesSexo } from 'src/app/enums/sexo';
import { FollowerResponse } from 'src/app/models/follower-response';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class CodigoService {

  todosDetalhesSexo: Array<DetalhesSexo> =[];
  dadosPerfilUsuario!: User;
  seguidoresDoPerfilUsuario!: any;
  indexParaListarPostsDeCadaPerfil!: number

  constructor() { 
    this.detalharInformacoesSexo();
  }

  detalharInformacoesSexo() {
    this.todosDetalhesSexo.fill(
      {
        codigo: 0,
        descricao: 'Descrição inválida'
      },
      0,
      3
    );

    this.todosDetalhesSexo[0] = {
      codigo: 1,
      descricao: 'Masculino'
    };

    this.todosDetalhesSexo[1]= {
      codigo: 2,
      descricao: 'Feminino'
    };

    this.todosDetalhesSexo[2] = {
      codigo: 3,
      descricao: 'Outro'
    }
  }
}
