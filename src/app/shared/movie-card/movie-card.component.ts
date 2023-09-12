import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie?: Movie;

  constructor(private router: Router) {}

  goToDetails() {
    sessionStorage.setItem('path', '/catalog/movie/'+this.movie?.id);
    this.router.navigate(['/catalog/movie', this.movie?.id]);
  }
}
