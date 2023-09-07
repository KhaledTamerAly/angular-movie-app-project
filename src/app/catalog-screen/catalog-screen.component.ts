import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/movie.model';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { UsersService } from '../user/users.service';

@Component({
  selector: 'app-catalog-screen',
  templateUrl: './catalog-screen.component.html',
  styleUrls: ['./catalog-screen.component.css']
})
export class CatalogScreenComponent implements OnInit{

  moviesList: Movie[] = [];
  loading: boolean = true;

  constructor(private movieService: MoviesService, private router: Router, private loginService: LoginService, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    console.log(this.usersService.getUsers());
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
