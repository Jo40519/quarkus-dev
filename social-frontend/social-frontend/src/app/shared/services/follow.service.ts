import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FollowerResponse } from 'src/app/models/follower-response';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private url = 'http://localhost:8080/users'

  constructor(private http: HttpClient) { }

  async seguirUsuario(userId: number,followerId: number): Promise<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put<User>(`${this.url}/${userId}/followers`, {followerId}, {headers}))
  }

  async listaSeguindo(userId: number): Promise<FollowerResponse> {
    return firstValueFrom(this.http.get<FollowerResponse>(`${this.url}/${userId}/followers/following`))
  }

  async listaSeguidores(userId: number) {
    return firstValueFrom(this.http.get<FollowerResponse>(`${this.url}/${userId}/followers`))
  }

  async deixarDeSeguirUsuario(userId: number, followerId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const params = {
      followerId: followerId
    }
    return  firstValueFrom(this.http.delete(`${this.url}/${userId}/followers`, {params}))
  }
}
