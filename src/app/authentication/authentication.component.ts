import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import { Router } from '@angular/router';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  errorMsg : string = "";

  constructor(
    private service : AuthenticationService,
    private router : Router) { }

  ngOnInit() {

  }

  login (username, password) {
    this.service.authenticate(username, password)
      .subscribe((status)=> {
        if (status == 401) {
          this.errorMsg = "Invalid username or password";
        } else {
          this.getPrincipals();
          this.errorMsg = "";
        }
      });
  }

  getPrincipals(){
    this.service.getPrincipals()
      .subscribe(res => {});
  }


}
