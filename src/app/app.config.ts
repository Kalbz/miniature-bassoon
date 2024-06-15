import { provideHttpClient } from "@angular/common/http";
import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { firebaseConfig } from "../environments/firebase.config";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule), // Import BrowserAnimationsModule here
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
    
  ]
};


