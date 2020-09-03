import { MovieService } from './../shared/services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  movies: any[] = []


  constructor(
    private movieService: MovieService

  ) { }
  

  ngOnInit(): void {
    this.retrieveAllMovies()
  }

  retrieveAllMovies() {
    this.movieService.getAllMovies().subscribe(data => {
      debugger
    })
  }
}
