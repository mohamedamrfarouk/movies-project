import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies-catalog/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MovieComponent,
    MoviesComponent,
    MovieDetailsComponent
    
  ],
  imports: [
    CommonModule, 
    FormsModule,
    SharedModule,    
    CoreRoutingModule ,
  ],
  exports:[
    MovieComponent,
    MoviesComponent,
    MovieDetailsComponent    
  ]
})
export class CoreModule { }
