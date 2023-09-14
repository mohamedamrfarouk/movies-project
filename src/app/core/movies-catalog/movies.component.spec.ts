import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { MoviesComponent } from './movies.component';
import { MoviesService } from '../../Services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../../shared/header/header.component';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { MovieComponent } from '../movie/movie.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../../Auth/guards/auth.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from '../../Auth/guards/auth-guard.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  let authService: AuthService;
  let auth: AuthService;
  let authGard: AuthGuard;
  let authServiceStub: Partial<AuthService>
  let mockMovie = [{adult: false,
    backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    description: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    genre_ids: [18, 80],
    id: 238,
    original_language: "en",
    poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    release_date: "1972-03-14",
    title: "The Godfather",
    vote_average: 8.7,
    vote_count: 18606,
  }]

  beforeEach(() => {
    authServiceStub={
      isAuthenticated:()=> true
    };
    TestBed.configureTestingModule({
      declarations: [MoviesComponent, HeaderComponent, LoadingComponent, MovieComponent],
      imports: [HttpClientModule, RouterModule, RouterTestingModule],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [MoviesService, AuthService]
    });

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should be created', () => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should use movies service',()=>{
    moviesService = fixture.debugElement.injector.get(MoviesService);
    fixture.detectChanges();
    expect(moviesService.dataArrived).toEqual(component.moviesDataArrived)
  });

  it('should loader be created',()=>{
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.loading-spinner')).toBeTruthy()
  });

  it('should header be created',()=>{
    fixture.detectChanges();
    let compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.header-content')).toBeTruthy()
  });


  it('should have the list of movies', waitForAsync(async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.moviesDataArrived).toEqual(true);
      expect(component.movies.length).toBeGreaterThan(5);

      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.movie-card').length).toEqual(component.movies.length);
    });

    
  }))

  it('should create movies cards', waitForAsync(async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {

      fixture.detectChanges();
      let compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelectorAll('.movie-card').length).toBeGreaterThan(0);
      expect(compiled.querySelectorAll('.loading-spinner').length).toEqual(0);

    }); 
  }))

  it('should load mock data from the service', waitForAsync(() => {
    moviesService = TestBed.inject(MoviesService);
    spyOn(moviesService, 'getMoviesDataObservable').and.returnValue(of(mockMovie));

    component.getData()
    
    fixture.detectChanges(); 
    fixture.whenStable().then(() => {
      fixture.detectChanges(); 
      expect(moviesService.getMoviesDataObservable).toHaveBeenCalled();
      expect(component.movies.length).toBeGreaterThan(0);
    }
  )
}));

});