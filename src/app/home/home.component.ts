import { Movie } from './../shared/models/movie';
import { MovieService } from './../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = []
 

  constructor(
    private movieService: MovieService

  ) { }
  

  ngOnInit(): void {
    this.retrieveAllMovies()
  }

  retrieveAllMovies() {
    this.movieService.getAllMovies().subscribe(movies => {
      if (movies) {
        this.movies = movies
      } 
      
    }, error => {
      if (error) {
        console.log(error)
      }
    })
  }
}
