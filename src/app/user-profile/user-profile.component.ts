import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  firstName : string;
  lastName : string;
  email : string;
  username : string;
  city   : string;
  password : string;
  msg : string;
  errorMsg  = "";

  constructor(
    private authService : AuthenticationService,
    private userService : UserService) { }

  ngOnInit() {
    this.authService.getPrincipals().subscribe(res => {
      this.username = res;

      if (this.username !== 'N/A') {
          this.getUserDetails(this.username);
      }
    });
  }

  getUserDetails(username) {
    this.userService.getUserDetails(username)
      .subscribe(user => {
        this.firstName = user.name == null ? "" : user.name;
        this.lastName = user.lastName == null ? "" : user.lastName;
        this.email = user.email == null ? "" : user.email;
        this.city = user.city == null ? "" : user.city;
      })
  }

  updateUserDetails(username, firstName, lastName, email, city, password) {
    this.userService.updateUserDetails(username, firstName, lastName, email, city, password)
      .subscribe(res => {
          if (res.error == null) {
          this.msg = "Your profile has been updated";
          document.getElementById("closeModal").click();
        }
        else
          this.errorMsg = res.error;
      })
  }
}
