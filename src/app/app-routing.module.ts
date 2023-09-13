import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { SignUpComponent } from './Auth/sign-up/sign-up.component';
import { AuthGuardLogin } from './Auth/services/auth-guard-prevent-login.service';

const appRoutes: Routes=[
  {path: 'login',canActivate:[AuthGuardLogin], component: LoginComponent},
  {path: 'signup',canActivate:[AuthGuardLogin], component: SignUpComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
