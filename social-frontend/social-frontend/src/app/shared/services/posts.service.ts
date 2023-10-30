import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { PostRequest } from 'src/app/home/models/post-request';
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
    return firstValueFrom(this.http.get<Array<PostResponse>>(url, { headers }))
  }

  async criarPosts(userId: number, postRequest: PostRequest) {
    const url = `${this.url}/${userId}/posts`
    return firstValueFrom(this.http.post(url, postRequest))
  }

  async editarPost(userId: number, postId: number, postRequest: PostRequest): Promise<PostResponse> {
    const urlDeletaPost = `${this.url}/${userId}/posts/${postId}`
    return firstValueFrom(this.http.put<PostResponse>(urlDeletaPost, postRequest));
  }
  async deletaPosts(userId: number, postId: number): Promise<PostResponse> {
    const urlDeletaPost = `${this.url}/${userId}/posts/${postId}`
    return firstValueFrom(this.http.delete<PostResponse>(urlDeletaPost));
  }
}
