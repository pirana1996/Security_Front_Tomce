import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {User} from "../models/user.model";
import {TradeRequest} from '../models/tradeRequest.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {

  constructor(private http : Http) { }

  private apiUrl = "/api/books/trade";
  private headers = new Headers({'Content-Type': 'application/json'});


  getMyBooks () : Observable<Book[]> {
    return this.http
      .get(`/api/user/books`)
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
      .get(`/api/user`)
      .map(response => response.json() as User);
  }

  updateUserDetails(
    username : string,
    firstName : string,
    lastName : string,
    email : string,
    city : string,
    password : string) : Observable<any> {
    return this.http.put(`/api/user/update`,{firstName, lastName, email, city, password} ,this.headers)
      .map(response => {
        return response.json()
      })
      .catch(error => {
        return Observable.of<any>(error);
      })
  }

  sendTradeRequest(giveBookId : number, takenBookId : number) : Observable<boolean> {
      return this.http
        .post(this.apiUrl, {giveBookId, takenBookId}, this.headers)
        .map(response => {
          return true;
        })
  }

  getMyTradeRequests() : Observable<TradeRequest[]> {
      return this.http
        .get(`${this.apiUrl}/requests/sent`)
        .map(res => res.json() as TradeRequest[])
        .catch(error => {
          return Observable.of<TradeRequest[]>([]);
        })

  }

  getTradeRequestForUser() : Observable<TradeRequest[]> {
      return this.http
        .get(`${this.apiUrl}/requests`)
        .map(res => res.json() as TradeRequest[])
        .catch(error => Observable.of<TradeRequest[]>([]));
  }

  removeTradeRequest(tradeRequestId : number) : Observable<boolean> {
      return this.http
        .delete(`${this.apiUrl}/${tradeRequestId}`, this.headers)
        .map(res => true);
  }

  acceptTradeRequest(tradeRequestId : number) : Observable<boolean> {
      return this.http
        .post(`${this.apiUrl}/${tradeRequestId}`, {tradeRequestId}, this.headers)
        .map(res => true);
  }
}
