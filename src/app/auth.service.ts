// auth.service.ts
import { Injectable, inject } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(response => updateProfile(response.user, { displayName: username }));

    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
     const promise = signInWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password,
     ).then(() => {});
     return from(promise);
  }

  isLoggedIn(): Observable<boolean> {
    return user(this.firebaseAuth).pipe(
      map(user => !!user)
    );
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }
}
