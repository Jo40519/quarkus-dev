import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserLogin } from './../login/models/user-login';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'http://localhost:8080/auth/login';
  private urlUser = 'http://localhost/users'
  autenticado!: boolean;
  usuarioLogado!: User;

  constructor(private http: HttpClient, private router: Router) {}

  async sing(userLogin: UserLogin): Promise<User> {
    this.autenticado = true;
    return firstValueFrom(
      this.http.post<Promise<User>>(this.url, userLogin)
    )
  }

  getUsuarioLogado(userId: number) {
    const token = localStorage.getItem("auth_token");
    console.log(token);
    return this.http.get(`${this.urlUser}/${userId}`, {headers: {Authorization: `Token ${token}`}})
  }

  naoAutenticado() {
    this.autenticado = false;
    this.router.navigate(['/login'])
  }

  estaAutenticado() {

    // const token = localStorage.getItem("auth_token");
    return this.autenticado;
  }
}


export const autenticacaoGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  console.log(authService.autenticado)
  if(authService.estaAutenticado()) {
    console.log('ESTOU TRUE NO AUTH?', authService.autenticado)
    return true
  } else{
    console.log('Estou chegando false?', authService.autenticado)
    authService.naoAutenticado();
    return false
  }
  
};
