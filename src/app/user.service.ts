import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Book} from "./models/book.model";
import {User} from "./models/user.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  private apiUrl = "/api/books/trade";
  private headers = new Headers({'Content-Type': 'application/json'});


  tradeBookMyBook(bookId : number) :Observable<Book> {
    return this.http
      .post(this.apiUrl, {bookId}, this.headers)
      .map(response => response.json() as Book);
  }

  tradeBook(username : string, bookId : number) : Observable<Book>{
    return this.http
      .post(`${this.apiUrl}/${username}`, {bookId}, this.headers)
      .map(response => response.json() as Book);
  }

  removeFromTradeList(bookId : number) : Observable<Book> {
    return this.http
      .put(`${this.apiUrl}/${bookId}`, this.headers)
      .map(response => {
        return response.json();
      });
  }

  getMyTradeRequests(username : string) : Observable<Book[]>{
    return this.http
      .get(`${this.apiUrl}/${username}`)
      .map (response => response.json() as Book[])
  }

  getMyBooks (username : string ) : Observable<Book[]> {
    return this.http
      .get(`/api/books/${username}`)
      .map(response => response.json() as Book[])
  }

  removeBook(bookId : number) : Observable<Boolean> {
    return this.http
      .delete(`/api/books/${bookId}`)
      .map(response => {
        return true;
      })
  }

  getUserDetails(username : string) : Observable<User> {
    return this.http
      .get(`/api/user/${username}`)
      .map(response => response.json() as User);
  }
}
