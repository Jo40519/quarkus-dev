import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostResponse } from 'src/app/models/post-response';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url = 'http://localhost:8080/users'
  constructor(private http: HttpClient) { }

  async listaPosts(userId: number, followerId: number): Promise<Array<PostResponse>> {
    const url = `${this.url}/${userId}/posts`
    const headers = new HttpHeaders().set('followerId', `${followerId}`);


    const params = {
      followerId: followerId
    }
    console.log(headers)
    return firstValueFrom(this.http.get<Array<PostResponse>>(url, { headers }))
  }
}
