import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})

export class TmdbService {
  private apiKey = environment.apiKey;
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
  getMovies(url:string = 'https://api.themoviedb.org/3//movie/top_rated?language=en-US&page=1'): Observable<any> {
    // const url = `${this.baseUrl}/trending/movie/day`;
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.httpClient.get(url, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(()=>'An error occurred, please try again later.');
      })
    );
  }

}
