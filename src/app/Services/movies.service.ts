import { Injectable } from '@angular/core';
import { TmdbService } from './TmdbService.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  private moviesDataSubject = new BehaviorSubject<any[]>([]);
  public dataArrived = false
  constructor(private tmdbService: TmdbService) {
    this.fetchTrendingMovies();
  }

  fetchTrendingMovies() {
    this.tmdbService.getMovies(environment.moviesURL).subscribe(
      (data) => {
        this.dataArrived =true
        const results = data.results;
        const movies = results.map((result) => ({
          id: result.id,
          original_language: result.original_language,
          adult: result.adult,
          genre_ids: result.genre_ids,
          backdrop_path: result.backdrop_path,
          title: result.title,
          vote_count: result.vote_count,
          vote_average: result.vote_average,
          release_date: result.release_date,
          poster_path: result.poster_path,
          description: result.overview
        }));
        this.moviesDataSubject.next(movies);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  getMoviesDataObservable(): Observable<any[]> {
    return this.moviesDataSubject.asObservable();
  }

  getMovieById(movieId:number): Observable<any>{
    return this.tmdbService.getMovieDetails(movieId)
  }
}
