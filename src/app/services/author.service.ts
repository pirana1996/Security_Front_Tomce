import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {Author} from "../models/author.model";
import 'rxjs/add/operator/map';

@Injectable()
export class AuthorService {

  private apiUrl = "/api/authors";

  constructor(private http: Http) { }

  searchAuthor(name : string) : Observable<Author[]> {
      return this.http.get(`${this.apiUrl}/${name}`)
        .map(res => {
          return res.json() as Author[]
        })
  }
}
