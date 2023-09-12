import { EventEmitter } from "@angular/core";
import { Movie } from "../models/movie.model";

const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTE3YTVhZjFkNzQyYjg3NjMyMmMzMjhjNjIwNTgwNSIsInN1YiI6IjY0ZjQ1YTkyN2Q0MWFhMDBlMThhM2M1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ruf0zUH9RVtx5YMmAPSDir_Qk7M6ojRJkywhaxCM7FU'
  };

export class MoviesService {

    async getMovies() {
        const options = {
            method: 'GET',
            headers: headers
          };
          let movies = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
          movies = await movies.json();
          return movies;
    }

    async getMovieById(id: number)
    {
      const options = {
        method: 'GET',
        headers: headers
      };
      let movie = await fetch('https://api.themoviedb.org/3/movie/'+id+'?language=en-US', options);
      movie = await movie.json();
      return movie;
    }
}