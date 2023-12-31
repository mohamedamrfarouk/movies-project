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
  private baseUrl = environment.serverBaseURL;

  constructor(private httpClient: HttpClient) {}


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

  getMovies(url:string): Observable<any> {
    const params = new HttpParams().set('api_key', this.apiKey);

    return this.httpClient.get(url, { params }).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError(()=>'An error occurred, please try again later.');
      })
    );
  }

}
