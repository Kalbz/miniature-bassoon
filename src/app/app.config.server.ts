import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';

const serverConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideHttpClient(withFetch()), 
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(),
  ],
};


export const config = mergeApplicationConfig(appConfig, serverConfig);
