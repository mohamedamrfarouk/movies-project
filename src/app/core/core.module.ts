import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'

import { SharedModule } from '../shared/shared.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesComponent } from './movies-catalog/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CoreRoutingModule } from './core-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MovieComponent,
    MoviesComponent,
    MovieDetailsComponent
    
  ],
  imports: [
    CommonModule, 
    BrowserModule, 

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
