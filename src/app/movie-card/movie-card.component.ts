import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Movie } from '../shared/models/movie';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit, OnChanges {
  @Input() movie: Movie
  movieImg: string
  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges() {
    if (this.movie) {
      this.movieImg = this.movie.image
    }
  }
  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla@2x.png'

  }

}
