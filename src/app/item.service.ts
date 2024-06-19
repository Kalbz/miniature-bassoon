// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, from } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/items'; // Adjust based on your server's address
  private newItemSubject = new Subject<any>();
  newItem$ = this.newItemSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createItem(item: any): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.post(this.apiUrl, item, { headers }).pipe(
          tap(newItem => this.newItemSubject.next(newItem)) // Notify subscribers of the new item
        );
      })
    );
  }

  updateItem(item: any): Observable<any> {
    return from(this.authService.getToken()).pipe(
      switchMap(token => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        return this.http.put(`${this.apiUrl}/${item.id}`, item, { headers });
      })
    );
  }

  async upvoteItem(id: string): Promise<Observable<any>> {
    const token = await this.authService.getToken();
    console.log('Token for upvote:', token);  // Debugging token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/${id}/upvote`, {}, { headers });
  }

  async downvoteItem(id: string): Promise<Observable<any>> {
    const token = await this.authService.getToken();
    console.log('Token for downvote:', token);  // Debugging token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this.apiUrl}/${id}/downvote`, {}, { headers });
  }
}
