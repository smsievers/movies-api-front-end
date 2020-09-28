import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { UserService } from './../../shared/services/user.service'
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: User
  private subs = new Subscription()
  constructor(
    private userService: UserService
  ) { 
    this.currentUser = this.userService.currentUserValue
  }

  ngOnInit(): void {
  }

  subscribeToCurrentUser() {
    this.subs.add(
      this.userService.currentUser.subscribe(user => {
        if (user) {
          this.currentUser = user
        } else { 
          this.currentUser = null
        }
      })
    )
  }
  logoutUser() {
    this.userService.logoutUser()
  }
  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
