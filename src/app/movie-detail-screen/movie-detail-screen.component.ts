import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies/movies.service';
import { Movie } from '../movies/movie.model';
import { ActivatedRoute, Router} from '@angular/router';

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

  constructor(private movieService: MoviesService, private route: ActivatedRoute, private router: Router){
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
    let movieId = this.route.snapshot.params['id'];
    this.movieService.getMovieById(movieId).then(
      async (movie: any) => {
        this.movie = movie;
        this.genre_list = this.movie?.genres;
        this.loading = false;
      }
    );
  }
  goToCatalog(){
    sessionStorage.setItem('path', '/catalog');
    this.router.navigate(['/catalog']);
  }
}
