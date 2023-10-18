import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url = 'http://localhost:8080/users'
  constructor(private http: HttpClient) { }

  async listaPosts(userId: number, followerId: number) {
    const url = `${this.url}/${userId}/posts`
    const headers = new HttpHeaders().set('followerId', `${followerId}`);


    const params = {
      followerId: followerId
    }

    return firstValueFrom(this.http.get(url, { headers }))
  }
}
