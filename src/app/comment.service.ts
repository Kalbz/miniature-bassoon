import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment.model';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getComments(itemId: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/${itemId}`);
  }

  postComment(comment: Comment): Observable<Comment> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post<Comment>(this.apiUrl, comment, { headers });
      })
    );
  }

  deleteComment(id: string): Observable<void> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
      })
    );
  }
}