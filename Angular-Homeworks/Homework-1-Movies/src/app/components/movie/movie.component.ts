import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent {
  @Input() movie: Movie;

  @Output() movieToPass = new EventEmitter<Movie>();

  onSendMovie() {
    this.movieToPass.emit(this.movie);
  }
}
