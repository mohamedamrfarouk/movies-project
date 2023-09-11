import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies-catalog/movies.component';
import { AuthGuard } from './Services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const appRoutes: Routes=[
  {path: 'movies-catalog', canActivate: [AuthGuard], component: MoviesComponent},
  {path: 'movie-details/:id', canActivate: [AuthGuard], component: MovieDetailsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: '**', redirectTo:'movies-catalog'},


]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
