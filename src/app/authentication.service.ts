import { Injectable,OnInit } from '@angular/core';
import {Http, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {User} from "./models/user.model";
import { ActivatedRoute, Router} from '@angular/router'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class AuthenticationService {

  private apiUrl = "/api/login";
  public isLoggedIn : boolean;
  public redirectUrl: string = "/";

  constructor(
    private http : Http,
    private route: ActivatedRoute,
    private router: Router) { }

  private newUser: Subject<string> = new Subject<string>();;
  user = this.newUser.asObservable();

  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  authenticate (username : string, password : string) : Observable<boolean> {
    let body = `username=${username}&password=${password}`;
    return this.http.post(this.apiUrl, body, {headers: this.headers})
      .map(response =>{
        this.router.navigate([this.redirectUrl]);
        this.isLoggedIn = true;
        this.newUser.next(username);
        return true;
      })
      .catch(error => {
        return Observable.of(false);
      })
  }

  logout() : Observable<any> {
    return this.http.get("/api/logout")
      .map(() => {
        console.log("Logged off");
        this.isLoggedIn = false;
        this.newUser.next("N/A");
      })
  }

  createUser(name : string, lastName : string, email : string, username : string, password : string, gender : string) : Observable<boolean>{
    let user = new User(name, lastName, email, username, password, gender);
    return this.http.post("/api/public/user/registration", user, {headers : new Headers({'Content-Type': 'application/json'})})
      .map(response => {
        console.log("Registrated");
        return true;
      })
      .catch(error => {
        console.log("Error occured - " + error);
        return Observable.of<boolean>(false);
      })
  }


  getPrincipals () : Observable<any>  {
    return this.http.get('/api/public/user')
      .map(response => {
        if (response.json().name !== "N/A"){
          this.isLoggedIn = true;
          console.log("is logged in is true - service");
        } else {
          this.isLoggedIn = false;
        }
        return response.json().name;
      })
  }



}
