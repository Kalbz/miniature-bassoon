import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { firebaseConfig } from "../environments/firebase.config";



export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
    
  ]
};






// import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
// import { provideRouter } from '@angular/router';

// import { routes } from './app.routes';
// import { provideClientHydration } from '@angular/platform-browser';
// import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { withFetch } from '@angular/common/http';
// import { provideHttpClient } from '@angular/common/http';
// import { provideFirebaseApp } from '@angular/fire/app';
// import { importProvidersFrom } from '@angular/core';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { initializeApp } from 'firebase/app';

// export const appConfig: ApplicationConfig = {
//   providers: [
//     provideZoneChangeDetection({ eventCoalescing: true }), 
//     provideHttpClient(withFetch()), 
//     provideRouter(routes), 
//     provideClientHydration(), 
//     provideAnimationsAsync(),
//     provideFirebaseApp(() => initializeApp({
//       "projectId":"ideas-163c6",
//       "appId":"1:1003912148324:web:763c9cc2f70c58eabbb671",
//       "storageBucket":"ideas-163c6.appspot.com",
//       "apiKey":"AIzaSyCjAznGm7esAdA_BuVtN4EEz_b4LoTirl4",
//       "authDomain":"ideas-163c6.firebaseapp.com",
//       "messagingSenderId":"1003912148324",
//       "measurementId":"G-FG33NKZZ72"
//     })), 
//   ],
// };


