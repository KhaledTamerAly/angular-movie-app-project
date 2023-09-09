import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../movies/movie.model';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-watchlist-screen',
  templateUrl: './watchlist-screen.component.html',
  styleUrls: ['./watchlist-screen.component.css']
})
export class WatchlistScreenComponent {
  moviesList: Movie[] = [];
  loading: boolean = true;
  username?: string;

  constructor(private movieService: MoviesService, private router: Router, private loginService: LoginService, private usersService: UsersService) {
    
  }

  ngOnInit(): void {
    this.getMovies();
    this.getUsername()
  }
  getMovies()
  {
    const watchlist: number[] = this.usersService.getWatchlist(this.usersService.getCurrentUser());
    this.movieService.getMovies().then((resolvedValue: any) => {
      let movies = resolvedValue.results;
      for(let movie of movies)
      {
        if(watchlist.includes(parseInt(movie.id)))
          this.moviesList.push(movie);
      }
      this.loading = false;
    });
  }
  goToCatalog() {
    sessionStorage.setItem('path', '/catalog');
    this.router.navigate(['/catalog']);
  }
  getUsername()
  {
    this.username = this.usersService.getCurrentUsername();
  }
}
