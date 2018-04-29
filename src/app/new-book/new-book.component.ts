import {Component, OnInit} from '@angular/core';
import {Book} from "../models/book.model";
import {Author} from "../models/author.model";
import {BookService} from "../services/book.service";
import {AuthorService} from "../services/author.service";
import {AuthenticationService} from '../services/authentication.service';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private authService: AuthenticationService,
    private authorService : AuthorService) {
  }

  imageUploaded = false;
  book: Book;
  user: string;
  errorMsg = "";
  authors : Observable<Author[]>;
  bookAuthors  = new Array();
  private searchTerms = new Subject<string>();


  ngOnInit() {
    this.authService.getPrincipals()
      .subscribe(res => {
        this.user = res;
        this.searchAuthor();
      })
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  addBook(user, name, description): void {
    this.bookService.addBook(user, name, this.bookAuthors, description)
      .then(res => {
        if (res.error == null) {
          this.book = res as Book;
          this.errorMsg = "";
        } else {
          this.errorMsg = "Please enter valid name";
        }
      });
  }

  searchAuthor() {
    this.authors = this.searchTerms
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(name => name ? this.authorService.searchAuthor(name) : Observable.of<Author[]>([]))
      .catch(error => {
        return Observable.of<Author[]>([]);
      })
  }

  imageAdded(): void {
    this.imageUploaded = true;
  }

  reload(): void {
    window.location.reload();
  }

  addAuthor(author : string) {
    this.bookAuthors.push(author);
  }

  removeBookAuthor(author : string) {
    this.bookAuthors = this.bookAuthors.filter( item => author !== item);
  }
}
