import { environment } from './../../../environments/environment';
import { HttpClient } from  '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieApi: string;
  constructor(
    private http: HttpClient
  ) {
    this.movieApi = '${environment.apiUrl}api/v1/movies';
   }
  
   getAllMovies() {
     return this.http.get<any>('${this.movieApi}/index')
   }
}
