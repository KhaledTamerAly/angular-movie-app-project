import { ComponentFixture, TestBed, async, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { CatalogScreenComponent } from './catalog-screen.component';
import { MoviesService } from '../movies/movies.service';
import { LoginService } from '../login/login.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Movie } from '../movies/movie.model';
import { MovieCardComponent } from '../movie-card/movie-card.component';
const movie: Movie = {
  adult: false,
  backdrop_path: "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
  genre_ids: [
      18,
      80
  ],
  id: 238,
  original_language: "en",
  original_title: "The Godfather",
  overview: "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
  popularity: 162.129,
  poster_path: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  release_date: "1972-03-14",
  title: "The Godfather",
  video: false,
  vote_average: 8.7,
  vote_count: 18551,
  genres:[]
};
describe('CatalogScreenComponent', () => {
  let component: CatalogScreenComponent;
  let fixture: ComponentFixture<CatalogScreenComponent>;
  let moviesService: MoviesService;

  beforeEach(() => {
    const moviesServiceMock = {
      getMovies: jasmine.createSpy('getMovies').and.returnValue(Promise.resolve({results: [movie]}))
    };

    TestBed.configureTestingModule({
      declarations: [CatalogScreenComponent, MovieCardComponent],
      providers: [{ provide: MoviesService, useValue: moviesServiceMock }, LoginService, HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(CatalogScreenComponent);
    component = fixture.debugElement.componentInstance;
    moviesService = TestBed.inject(MoviesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be loaded into DOM correctly', fakeAsync(() => {
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      expect(moviesService.getMovies).toHaveBeenCalled();
      expect(component.moviesList).toEqual([movie]);
      const movieCards = fixture.debugElement.nativeElement.querySelectorAll('app-movie-card');
      console.log(movieCards);
      expect(movieCards.length).toEqual(component.moviesList.length);
      for (let i = 0; i < movieCards.length; i++) {
        expect(movieCards[i].textContent).toContain(component.moviesList[i].title);
      }
    });
  }));

  it('should have the list of movies and init correctly', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(moviesService.getMovies).toHaveBeenCalled();
      expect(component.moviesList).toEqual([movie]);
    });
  }));
});

