import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { FollowerResponse } from 'src/app/models/follower-response';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  private url = 'http://localhost:8080/users'

  constructor(private http: HttpClient) { }

  async seguirUsuario(followerId: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return firstValueFrom(this.http.put(`${this.url}/${5}/followers`, {followerId}, {headers}))
  }

  async listaSeguidores(userId: number): Promise<FollowerResponse> {
    return firstValueFrom(this.http.get<FollowerResponse>(`${this.url}/${userId}/followers`))
  }
}
