import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../Services/movies.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent {
  private movieSubscription: Subscription;
  private movieId = +this.route.snapshot.paramMap.get('id');
  movieDetails= null

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
    
  ) {
    
    console.log("my movie id: ", this.movieId)

  }
  
  ngOnInit() {
    // Get the movie ID from the route parameters
    
  
    // Subscribe to the getMovieById() observable
    this.movieSubscription = this.moviesService.getMovieById(this.movieId).subscribe(
      (movieData) => {
        // Handle the successful response here
        this.movieDetails = movieData
        console.log('Movie Details:', movieData);
        // Update your component properties with the movie data if needed
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }
}
