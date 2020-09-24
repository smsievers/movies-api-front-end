import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from './../../../environments/environment';
import { User } from './../models/user';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<User>
  private userApi: string
  public currentUser: Observable<User>
  constructor(
    private http: HttpClient,
    private storage: LocalStorageService
  ) { 
    this.userApi = '${environment.apiUrl}api/v1/users'
    this.currentUserSubject = new BehaviorSubject<User>(this.storage.getItem('currentUser'))
    this.currentUser = this.currentUserSubject.asObservable()
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value
  }
  setCurrentUser(user: User) {
    this.currentUserSubject.next(user)
  }
  login() {}

  signup(params) {
    return this.http.post<any>('${this.userApi}/create', params)
    .pipe(
      catchError(this.handleError),
      map(res => {
        if (res && res.token) {
          const newUser = new User(res)
          this.storage.setItem('accesstoken', res.token)
          this.storage.setItem('currentUser', newUser)
          this.currentUserSubject.next(newUser)
          return { success: true, user: newUser }
        }
      })
    )
  }

  logout() {}

  handleError(error) {
    let returnError
    if (error.error instanceof ErrorEvent) {
      returnError = { statusCode: error.error.statusCode, message: 'Error ${error.error.message}'}
    } else {
      returnError = { statusCode: error.error.statusCode, message: 'Error Code: ${error.status}\nMessage: ${error.message}'}
    } return throwError(returnError)
  }
}