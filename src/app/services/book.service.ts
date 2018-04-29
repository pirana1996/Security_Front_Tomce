import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import {Book} from '../models/book.model';
import {Author} from "../models/author.model";
import {BookDetails} from '../models/bookDetails.model';
import {Observable} from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BookService {

  private apiUrl = "/api/public/books";
  private headers = new Headers({'Content-Type': 'application/json'});


  constructor(private http : Http) { }

  getBooks (sort : string) : Promise<any[]> {
    return this.http.get(`${this.apiUrl}/${sort}`)
      .toPromise()
      .then(response => {
        return response.json() as Book[];
      })
      .catch(error => {
        console.log("Error occurred in getBooks", error);
      })
  }

  getOtherBooks () : Observable<Book[]> {
    return this.http
      .get(`api/books/custom`)
      .map(data => data.json() as Book[])
      .catch(error => Observable.of<Book[]>([]));
  }

  addBook (user : string, name : string, authors : Author[], description : string) : Promise<any> {
    return this.http
      .post("/api/books",{user, name, authors, description})
      .toPromise()
      .then(res =>  res.json())
      .catch(error => {
        console.log("Error occurred in addBook - service", error);
      })
  }

  search(searchKey : string) : Observable<Book[]> {
    let queryUrl = `${this.apiUrl}/search/${searchKey}`;
    if (searchKey == "")
      queryUrl = this.apiUrl;
    return this.http
      .get(queryUrl)
      .map(data => data.json() as Book[])
      .catch(error => Observable.of<Book[]>([]));
  }

  getBook(bookId) : Observable<Book> {
    return this.http
      .get(`api/public/books/${bookId}/details`)
      .map(data => data.json() as Book)
      .catch(error => Observable.of<Book>());
  }
}
