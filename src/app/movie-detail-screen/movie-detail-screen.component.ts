import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../movies/movie.model';
import { ActivatedRoute, Router} from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-movie-detail-screen',
  templateUrl: './movie-detail-screen.component.html',
  styleUrls: ['./movie-detail-screen.component.css']
})
export class MovieDetailScreenComponent implements OnInit{

  movie?: Movie;
  genre_list?: {id: number, name: string}[];
  loading: boolean = true;
  hoveringOverPoster: boolean = false;
  isAdded: boolean = false;

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router, private usersService: UsersService){
  }

  onHover()
  {
    this.hoveringOverPoster = true;
  }
  onLeave()
  {
    this.hoveringOverPoster = false;
  }
  ngOnInit(): void {
    this.getMovieDetails();
  }
  getMovieDetails()
  {
    let movieId = this.route.snapshot.params['id'];
    const watchlist: number[] = this.usersService.getWatchlist(this.usersService.getCurrentUser());
    if(watchlist.includes(parseInt(movieId)))
      this.isAdded = true
    this.movieService.getMovieById(movieId).then(
      async (movie: any) => {
        this.movie = movie;
        this.genre_list = this.movie?.genres;
        this.loading = false;
      }
    );
  }
  addToWatchList()
  {
    const user_id: number = this.usersService.getCurrentUser();
    this.usersService.addToWatchlist(user_id, this.movie?.id);
    this.goToCatalog();
  }
  goToCatalog(){
    sessionStorage.setItem('path', '/catalog');
    this.router.navigate(['/catalog']);
  }
}
