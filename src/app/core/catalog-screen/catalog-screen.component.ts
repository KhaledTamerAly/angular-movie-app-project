import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { LoginService } from '../../services/login.service';
import { environment } from "src/environments/environment.development";

@Component({
  selector: 'app-catalog-screen',
  templateUrl: './catalog-screen.component.html',
  styleUrls: ['./catalog-screen.component.css']
})
export class CatalogScreenComponent implements OnInit{

  moviesList: Movie[] = [];
  loading: boolean = true;
  username?: string;
  title: string = '';

  constructor(private movieService: MoviesService, private router: Router, private loginService: LoginService, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.getMovies();
    this.getUsername();
    this.setTitle();
  }
  setTitle()
  {
    if(environment.production)
      this.title = 'Top List of Now Playing Movies';
    else
      this.title = 'Top Rated Movies of all Time';
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
    sessionStorage.setItem('path', '/catalog/watchlist');
    this.router.navigate(['/catalog/watchlist']);
  }
}
