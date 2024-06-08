// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { AuthService } from './app/auth.service';
import { ProtectedComponent } from './app/protected/protected.component';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';



console.log('Bootstrapping the application...');

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application bootstrapped successfully!'))
  .catch(err => console.error('Error bootstrapping the application:', err));