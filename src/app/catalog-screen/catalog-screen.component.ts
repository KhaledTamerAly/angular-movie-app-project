import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/movie.model';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-catalog-screen',
  templateUrl: './catalog-screen.component.html',
  styleUrls: ['./catalog-screen.component.css']
})
export class CatalogScreenComponent implements OnInit{

  moviesList: Movie[] = [];
  loading: boolean = true;

  constructor(private movieService: MoviesService, private router: Router, private loginService: LoginService) {
    
  }

  ngOnInit(): void {
    this.movieService.getMovies().then((resolvedValue: any) => {
      this.moviesList = resolvedValue.results;
      this.loading = false;
    });
  }
  goToLogin() {
    this.router.navigate(['/']);
    this.loginService.logout();
  }
}
