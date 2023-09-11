import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';

import { MoviesComponent } from './movies.component';
import { MoviesService } from '../Services/movies.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { LoadingComponent } from '../loading/loading.component';
import { MovieComponent } from '../movie/movie.component';
import { By } from '@angular/platform-browser';
import { AuthService } from '../Services/auth.service';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';


describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MoviesComponent, HeaderComponent, LoadingComponent, MovieComponent],
      imports: [HttpClientModule, RouterModule],
      providers: [MoviesService, AuthService]
    });

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.debugElement.componentInstance;
    // fixture.detectChanges();
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


  it('should have the list of movies', waitForAsync(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.moviesDataArrived).toEqual(true);
      expect(component.movies.length).toBeGreaterThan(5);
    });
  }))

  // it('should create movies cards', waitForAsync(() => {
  //   // moviesService = fixture.debugElement.injector.get(MoviesService);
  //   component.moviesDataArrived = true
  //   fixture.detectChanges();
  //   // tick()
  //   fixture.whenStable().then(()=>{ 
  //   fixture.detectChanges();
  //   let compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelectorAll('.movie-content').length).toBeGreaterThan(0);
  // })}))

});
