import { Component, OnInit, OnChanges } from '@angular/core';
import { MoviesService } from '../Services/movies.service';
import { TmdbService } from '../Services/TmdbService.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'], 
  providers:[MoviesService, TmdbService]
})

export class MoviesComponent implements OnInit, OnChanges{
  results = null
  moviesDataArrived = false
  movies : {id: number, 
            original_language: string, 
            adult: boolean,
            genre_ids: [],
            backdrop_path:string, 
            title: string,
            vote_count: number,
            vote_average: number,
            release_date: string,
            poster_path: string,
            discription:string
          }[] =[]
  
  constructor(private MoviesService: MoviesService){
    console.log("1",this.moviesDataArrived)
  }

  ngOnInit() {
    console.log("2",this.moviesDataArrived)
    this.MoviesService.getMoviesDataObservable().subscribe((data) => {
      this.movies = data; // Update the movies array when data changes
      this.moviesDataArrived = this.MoviesService.dataArrived
      console.log("3" ,this.moviesDataArrived)
    });
  }
  ngOnChanges(){
  }
}
