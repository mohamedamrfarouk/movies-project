import { Component, OnInit, OnChanges , AfterViewChecked, AfterViewInit} from '@angular/core';
import { MoviesService } from '../Services/movies.service';
import { TmdbService } from '../Services/TmdbService.service';
import { HttpClientModule } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'], 
  providers:[MoviesService, TmdbService]
})

export class MoviesComponent implements OnInit{
  results = null
  moviesDataArrived = false
  moviesRendered = 0
  movies = []

  component: {
    adult: boolean; backdrop_path: string; description: string; genre_ids: number[]; id: number; original_language: string; poster_path: string; // debugger;
    release_date: string; title: string; vote_average: number; vote_count: number;
  };
  
  constructor(private MoviesService: MoviesService){}

  ngOnInit() {
    this.getData()
  }

  getData(){
    this.MoviesService.getMoviesDataObservable().subscribe((data) => {
      this.movies = data; 
      this.moviesDataArrived = this.MoviesService.dataArrived
    });
  }

}
