import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  private apiKey = 'f5d639749f95795ab5bc76ad1e2cf539';
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) {}


  // Get movie details by ID
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.httpClient.get(url, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(()=>'An error occurred, please try again later.');
      })
    );
  }

  // Get a list of trending movies
  getTrendingMovies(): Observable<any> {
    const url = `${this.baseUrl}/trending/movie/day`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.httpClient.get(url, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(()=>'An error occurred, please try again later.');
      })
    );
  }
  getTopRatedMovies(pageNumber:number = 1): Observable<any>{
    const url = `${this.baseUrl}/movie/top_rated?language=en-US&page=${pageNumber}`
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.httpClient.get(url, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(()=>'An error occurred, please try again later.');
      })
    );
  
  }

}
