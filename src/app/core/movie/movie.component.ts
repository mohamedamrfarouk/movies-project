import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent  {
  @Input() movieData:{id: number, 
                      original_language: string, 
                      adult: boolean,
                      genre_ids: [],
                      backdrop_path:string, 
                      title: string,
                      vote_count: number,
                      vote_average: number,
                      release_date: String,
                      poster_path: string,
                      discription:string
                    }
}
