import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/shared/models/movie';
import { User } from 'src/app/shared/models/user';
import { MovieService } from 'src/app/shared/services/movie.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ReviewService } from 'src/app/shared/services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-edit-review',
  templateUrl: './add-edit-review.component.html',
  styleUrls: ['./add-edit-review.component.scss']
})
export class AddEditReviewComponent implements OnInit, OnDestroy {
  form: FormGroup
  formValues: any
  submitting = false
  hasError = false
  errorMsg: string
  currentUser: User
  movie: Movie
  movieImg: string
  
  reviewRatings = [
    {id: 1, val: 1},
    {id: 2, val: 2},
    {id: 3, val: 3},
    {id: 4, val: 4},
    {id: 5, val: 5}
  ]
  isNew = false
  isEdit = false
  private subs = new Subscription()
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private movieService: MovieService,
    private reviewService: ReviewService
  
  ) {
    this.currentUser = this.userService.currentUserValue
    }

  ngOnInit(): void {
    this.handleSubs()
    this.createFormControls()
    this.createForm()
  }

  handleSubs() {
    this.route.params.subscribe(data => {
      if (data && data.id) {
        this.retrieveMovie(data.id)
      }
    })
  }

  retrieveMovie(id: number) {
    const params = {id: id}
    this.subs.add(
      this.movieService.getMovieById(params).subscribe(data =>{
        if (data && data.movie) {
          this.movie = data.movie
          if (this.movie.image) {
            this.movieImg = this.movie.image
          } else {
            this.movieImg = null
          }
        }
      }, error => {
        if (error) {
          console.error(error)
        }
      })
    )
  }

  createFormControls() {
    this.formValues = {
      starRating: [null, Validators.required],
      body: ['', Validators.required]
    }
  }

  createForm() {
    this.form = this.fb.group(this.formValues)
  }

  setDefaultPic() {
    this.movieImg = 'assets/images/batman-vs-godzilla.png'
  }
  
  submitForm() {
    this.hasError = false
    this.submitting = true
    if (this.form.invalid) {
      this.hasError = true
      this.submitting = false
      return
    }
    const form = this.form.value
    const params = {
      user_id: this.currentUser.id,
      movie_id: this.movie.id,
      user_nickname: this.currentUser.nickname,
      rating: form.starRating,
      body: form.body
    }
    this.subs.add(
      this.reviewService.createReview(params).subscribe(data => {
        if (data) {
          this.submitting = false
          Swal.fire(
            {
              icon: 'success',
              title: 'A new review has been added!',
              showConfirmButton: false,
              timer: 2000
            }
          ).then(() => {
            this.form.reset()
          })
        }
      }, error => {
        if  (error) {
          console.error(error)
          this.submitting = false
          this.hasError = true
          this.errorMsg = 'Something went wrong while trying to create that review!'
        }
      })
    )
  }

  cancel() {
    this.form.reset()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }


}
