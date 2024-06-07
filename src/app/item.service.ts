// src/app/services/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private apiUrl = 'http://localhost:3000/api/items'; // Adjust based on your server's address
  private newItemSubject = new Subject<any>();
  newItem$ = this.newItemSubject.asObservable();

  constructor(private http: HttpClient) {}

  getItems(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createItem(item: any): Observable<any> {
    return this.http.post(this.apiUrl, item).pipe(
      tap(newItem => this.newItemSubject.next(newItem)) // Notify subscribers of the new item
    );
  }

  
}
