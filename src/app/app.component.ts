// src/app/app.component.ts
import { Component, inject, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ItemListComponent } from './item-list/item-list.component';
import { RouterLink, RouterOutlet, Router, Event, NavigationEnd } from '@angular/router';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../environments/firebase.config';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { getRedirectResult } from 'firebase/auth';
import { HeaderComponent } from './header/header.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, ContextMenuComponent, ItemListComponent, RouterOutlet, RouterLink, HeaderComponent],
  providers: [AuthService]
})
export class AppComponent implements OnInit {

  contextMenuVisible = false;
  contextMenuPosition = { x: 0, y: 0 };
  isLoggedIn$: Observable<boolean>;
  isLoginOrRegisterRoute: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isLoginOrRegisterRoute = event.url === '/login' || event.url === '/register';
    });
  }

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX;
    this.contextMenuPosition.y = event.clientY;
    this.contextMenuVisible = true;
    console.log('Right click at:', this.contextMenuPosition);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.contextMenuVisible) {
      this.contextMenuVisible = false;
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapePress(event: KeyboardEvent) {
    if (this.contextMenuVisible) {
      this.contextMenuVisible = false;
    }
  }
}
