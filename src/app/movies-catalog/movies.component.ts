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

export class MoviesComponent implements OnInit, OnChanges, AfterViewChecked{
  results = null
  moviesDataArrived = false
  moviesRendered = 0
  movies = []
  // {id: number, 
  //           original_language: string, 
  //           adult: boolean,
  //           genre_ids: [],
  //           backdrop_path:string, 
  //           title: string,
  //           vote_count: number,
  //           vote_average: number,
  //           release_date: string,
  //           poster_path: string,
  //           discription:string
  //         }[] =[]
  component: {
    adult: boolean; backdrop_path: string; description: string; genre_ids: number[]; id: number; original_language: string; poster_path: string; // debugger;
    release_date: string; title: string; vote_average: number; vote_count: number;
  };
  
  constructor(private MoviesService: MoviesService){
    console.log("1",this.moviesDataArrived)
  }

  ngOnInit() {
    // console.log("2",this.moviesDataArrived)
    this.MoviesService.getMoviesDataObservable().subscribe((data) => {
      this.movies = data; // Update the movies array when data changes
      this.moviesDataArrived = this.MoviesService.dataArrived
      console.log("movies arrived")
      console.log(this.movies[0])

      // console.log("3" ,this.moviesDataArrived)
    });
  }
  ngOnChanges(){
  }
  ngAfterViewChecked(){
    this.moviesRendered += 1
    console.log("movie rendered: ", this.moviesRendered)
    // debugger;

  }
}
