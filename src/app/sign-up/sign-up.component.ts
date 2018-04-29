import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(
    private service : AuthenticationService,
    private router : Router) { }

  gender : string;
  errorMsg : string = "";

  ngOnInit() {
  }

  signUp(name, lastName, email, username : string, password : string, confirmPassword : string, gender, city) {
    if (username.length > 3 && password.length > 5 && (confirmPassword === password)) {
      this.service.createUser(name, lastName, email, username, password, gender, city)
        .subscribe((res) => {
          if (res.error == null) {
            this.router.navigate(["/login"]);
          } else {
            console.log(res.error);
            this.errorMsg = res.error;
          }
        })
    } else {
      this.errorMsg = "Incorrect username or password";
    }
  }

  setGender(gender) {
    this.gender = gender;
  }
}
