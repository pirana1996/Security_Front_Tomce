import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Book} from './models/book.model';
@Injectable()
export class BookService {

  private apiUrl = "/api/public/books";
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http : Http) { }

  getBooks () : Promise<any[]> {
    return this.http.get(this.apiUrl)
      .toPromise()
      .then(response => response.json() as any[])
      .catch(error => {
        console.log("Error occurred in getBooks", error);
      })
  }

  addBook (name : string, user : string) : Promise<Book> {
    return this.http
      .post("/api/books",{name, user}, {headers: this.headers})
      .toPromise()
      .then(res => res.json() as Book)
      .catch(error => {
        console.log("Error occurred in addBook - service", error);
      })
  }
}
