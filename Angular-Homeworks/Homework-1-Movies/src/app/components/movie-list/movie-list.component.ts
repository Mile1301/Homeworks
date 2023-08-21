import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent {
  @Input() movieList: Movie[];

  selectedMovie: Movie = null;
  isMovieDetailsOn = false;

  onReciveMovie(outputMovie: Movie) {
    this.selectedMovie = outputMovie;
    this.isMovieDetailsOn = true;
  }
}
