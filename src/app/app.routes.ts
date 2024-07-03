// app.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component'; // Example protected component
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { ItemDetailsComponent } from './item-details/item-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'item/:id', component: ItemDetailsComponent }

];
