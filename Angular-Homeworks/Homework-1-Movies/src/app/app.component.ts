import { Component } from '@angular/core';
import { Movie } from './interfaces/movie.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'moviesApp';

  movieMockData: Movie[] = [
    {
      name: 'Inception',
      releaseDate: new Date('2010-07-16'),
      producerName: 'Christopher Nolan',
      genre: 'ScienceFiction',
    },
    {
      name: 'The Shawshank Redemption',
      releaseDate: new Date('1994-09-23'),
      producerName: 'Frank Darabont',
      genre: 'Drama',
    },
    {
      name: 'The Dark Knight',
      releaseDate: new Date('2008-07-18'),
      producerName: 'Christopher Nolan',
      genre: 'Action',
    },
    {
      name: 'Pulp Fiction',
      releaseDate: new Date('1994-10-14'),
      producerName: 'Quentin Tarantino',
      genre: 'Crime',
    },
    {
      name: 'Forrest Gump',
      releaseDate: new Date('1994-07-06'),
      producerName: 'Robert Zemeckis',
      genre: 'Drama',
    },
    {
      name: 'The Matrix',
      releaseDate: new Date('1999-03-31'),
      producerName: 'The Wachowskis',
      genre: 'ScienceFiction',
    },
    {
      name: 'The Godfather',
      releaseDate: new Date('1972-03-24'),
      producerName: 'Francis Ford Coppola',
      genre: 'Crime',
    },
    {
      name: 'Avatar',
      releaseDate: new Date('2009-12-18'),
      producerName: 'James Cameron',
      genre: 'ScienceFiction',
    },
    {
      name: 'Incredibles 2',
      releaseDate: new Date('2018-06-15'),
      producerName: 'Brad Bird',
      genre: 'Animation',
    },
    {
      name: 'The Lion King',
      releaseDate: new Date('1994-06-15'),
      producerName: 'Roger Allers',
      genre: 'Animation',
    },
    {
      name: 'Avengers: Endgame',
      releaseDate: new Date('2019-04-26'),
      producerName: 'Anthony Russo, Joe Russo',
      genre: 'Action',
    },
    {
      name: 'Interstellar',
      releaseDate: new Date('2014-11-07'),
      producerName: 'Christopher Nolan',
      genre: 'ScienceFiction',
    },
    {
      name: 'Jurassic Park',
      releaseDate: new Date('1993-06-11'),
      producerName: 'Steven Spielberg',
      genre: 'ScienceFiction',
    },
    {
      name: 'The Lord of the Rings: The Fellowship of the Ring',
      releaseDate: new Date('2001-12-19'),
      producerName: 'Peter Jackson',
      genre: 'Fantasy',
    },
    {
      name: 'Toy Story',
      releaseDate: new Date('1995-11-22'),
      producerName: 'John Lasseter',
      genre: 'Animation',
    },
    {
      name: 'The Social Network',
      releaseDate: new Date('2010-10-01'),
      producerName: 'David Fincher',
      genre: 'Drama',
    },
  ];
}
