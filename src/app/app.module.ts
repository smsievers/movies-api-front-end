import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthorizationHeaderService } from './shared/services/authorization-header.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { 
  faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight,faUpload, faVideo, 
  faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle
} from '@fortawesome/free-solid-svg-icons';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieService } from './shared/services/movie.service';
import { UserService } from './shared/services/user.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SingleMovieComponent } from './movies/single-movie/single-movie.component';
import { InputStarRatingComponent } from './movies/input-star-rating/input-star-rating.component';
import { ReviewCardComponent } from './movies/review-card/review-card.component';
import { TimeAgoPipe } from './shared/pipes/time-ago.pipe';
import { MovieReviewsComponent } from './movies/movie-reviews/movie-reviews.component';
import { SingleReviewCardComponent } from './movies/single-review-card/single-review-card.component';
import { AddEditReviewComponent } from './reviews/add-edit-review/add-edit-review.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    MovieCardComponent,
    SignupComponent,
    LoginComponent,
    SingleMovieComponent,
    InputStarRatingComponent,
    ReviewCardComponent,
    TimeAgoPipe,
    MovieReviewsComponent,
    SingleReviewCardComponent,
    AddEditReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    MovieService,
    UserService,
    LocalStorageService,
    { provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationHeaderService,
      multi: true
    }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(
    private library: FaIconLibrary
  ) {
    this.library.addIcons(faSpinner, faAngleLeft, faAngleRight, faPlus, faStar, faStarHalfAlt, faArrowRight,faUpload, faVideo, 
      faEdit, faPen, faTrashAlt, faSearch, faUser, faKey, faEye, faEyeSlash, faSignInAlt, faSignOutAlt, faUserPlus, faCircle
    )
  }
}
