import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, map, tap } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

    private url = 'http://localhost:8080/users'

  constructor(private http: HttpClient) { }

  async cadastrarUsuario(usuario: Omit<User, 'id'>): Promise<User> {
    return firstValueFrom(this.http.post<User>(this.url, usuario))
  }

  verificarEmail(email: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(this.url)
  }
}
