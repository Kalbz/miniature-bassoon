import { Injectable, inject } from '@angular/core';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth';
import { Auth, user, getIdToken } from '@angular/fire/auth';
import { Observable, from, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { UserInterface } from './user.interface'; // Adjust the path as needed


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  firebaseAuth = inject(Auth);
  private token: string | null = null;

  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth, 
      email, 
      password
    ).then(response => updateProfile(response.user, { displayName: username }));

    return from(promise).pipe(
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(error);
      })
    );
  }

  login(email: string, password: string): Observable<void> {
    return from(signInWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
      switchMap(response => from(getIdToken(response.user))),
      map(token => {
        this.token = token;
        localStorage.setItem('token', token); // Store the token in localStorage
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(error);
      })
    );
  }
  
  loginWithGoogle(): Observable<void> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.firebaseAuth, provider)).pipe(
      switchMap(response => from(getIdToken(response.user))),
      map(token => {
        this.token = token;
        localStorage.setItem('token', token); // Store the token in localStorage
      }),
      catchError((error) => {
        console.error('Google login error:', error);
        return throwError(error);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return user(this.firebaseAuth).pipe(
      map(user => !!user)
    );
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut().then(() => {
      this.token = null;
      localStorage.removeItem('token'); // Remove the token from localStorage
    });
    return from(promise).pipe(
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(error);
      })
    );
  }
  
  async getToken(): Promise<string> {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    if (this.token) {
      return this.token;
    }
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      const token = await getIdToken(currentUser);
      this.token = token;
      localStorage.setItem('token', token); // Store the token in localStorage
      return token;
    } else {
      throw new Error('No user logged in');
    }
  }

  getUser(): any {
    const currentUser = this.firebaseAuth.currentUser;
    if (currentUser) {
      return { 
        id: currentUser.uid, 
        displayName: currentUser.displayName, 
        email: currentUser.email };
    } else {
      return null;
    }
  }
  
  

}