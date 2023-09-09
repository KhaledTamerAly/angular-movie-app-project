import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../movies/movie.model';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-catalog-screen',
  templateUrl: './catalog-screen.component.html',
  styleUrls: ['./catalog-screen.component.css']
})
export class CatalogScreenComponent implements OnInit{

  moviesList: Movie[] = [];
  loading: boolean = true;
  username?: string;

  constructor(private movieService: MoviesService, private router: Router, private loginService: LoginService, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.getMovies();
    this.getUsername();
  }
  getUsername()
  {
    this.username = this.usersService.getCurrentUsername();
  }
  getMovies()
  {
    this.movieService.getMovies().then((resolvedValue: any) => {
      this.moviesList = resolvedValue.results;
      this.loading = false;
    });
  }
  goToLogin() {
    this.router.navigate(['/']);
    this.loginService.logout();
  }
  goToWatchlist()
  {
    sessionStorage.setItem('path', '/watchlist');
    this.router.navigate(['/watchlist']);
  }
}
