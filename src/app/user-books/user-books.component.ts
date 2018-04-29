import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from "../services/user.service";
import {Book} from "../models/book.model";

@Component({
  selector: 'app-user-books',
  templateUrl: './user-books.component.html',
  styleUrls: ['./user-books.component.css']
})
export class UserBooksComponent implements OnInit {

  isLoggedIn : boolean;
  username : string;
  myBooks : Book[];
  removeBookId : number;

  constructor(
    private authService : AuthenticationService,
    private userService : UserService
  ) { }

  ngOnInit() {
    this.authService.getPrincipals()
      .subscribe(user => {
        if (user !== "N/A") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        this.username = user;

        if(this.isLoggedIn){
          this.getMyBooks();
        }
      })
  }

  getMyBooks() {
    this.userService.getMyBooks()
      .subscribe(data => {
        this.myBooks = data;
      })
  }

  removeBook(bookId) {
    this.userService.removeBook(bookId)
      .subscribe(res => {
      this.myBooks = this.myBooks.filter(book => {
        if (book.id != bookId) return book;
      })
      })
  }

  setBookForRemove(bookId){
    this.removeBookId = bookId;
  }
}
