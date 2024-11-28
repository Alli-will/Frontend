import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/posts';  

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, post);
  }

  likePost(postId: number, userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/like`, { userId });
  }

  commentPost(postId: number, comment: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${postId}/comment`, { comment });
  }
}