import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent } from './movies-catalog/movies.component';
import { AuthGuard } from '../Auth/services/auth-guard.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

const appRoutes: Routes=[
  {path: 'movies-catalog', canActivate: [AuthGuard], component: MoviesComponent},
  {path: 'movie-details/:id', canActivate: [AuthGuard], component: MovieDetailsComponent},
  {path: '**', redirectTo:'movies-catalog', pathMatch:'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
