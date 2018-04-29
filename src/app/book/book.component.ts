import {Component, OnInit} from '@angular/core';
import {BookService} from "../services/book.service";
import {Book} from "../models/book.model";
import {AuthenticationService} from '../services/authentication.service';
import {UserService} from "../services/user.service";
import 'rxjs/add/operator/map'
import {TradeRequest} from "../models/tradeRequest.model";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  isLoggedIn: boolean;
  username: string;
  books: Book[];
  otherBooks: Book[];
  myBooks: Book[];
  myBookForTrade = new Book();
  targetBookId = 0;
  myBook = false;
  mySentTradeRequests: TradeRequest[];
  tradeRequestForUser: TradeRequest[];
  searchKey = "";
  page = 1;

  constructor(private bookService: BookService,
              private authService: AuthenticationService,
              private userService: UserService) {
  }


  ngOnInit() {
    this.authService.getPrincipals()
      .subscribe(user => {
        if (user !== "N/A") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
        this.username = user;


        if (this.isLoggedIn) {
          this.getMySentTradeRequests();
          this.getTradeRequestForUser();
        } else {
          this.getBooks("id");
        }
      })

    this.authService.user.subscribe(res => {
      if (res != "N/A") {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    })
  }

  isInMySentTradeRequest(bookId): boolean {
    let result = false;
    if (this.mySentTradeRequests != null) {
      this.mySentTradeRequests.forEach(tradeRequest => {
        if (bookId == tradeRequest.givenBook.id || bookId == tradeRequest.takenBook.id)
          result = true;
      })
    }
    return result;
  }

  getMyBooks() {
    this.userService.getMyBooks()
      .subscribe(data => {
        this.myBooks = data;
      })
  }

  getOtherBooks() {
    if (this.isLoggedIn && this.books != null) {
      this.bookService.getOtherBooks()
        .subscribe(data => {
          this.otherBooks = data;
        })
    }
  }

  getMySentTradeRequests() {
    this.userService.getMyTradeRequests()
      .subscribe(data => {
        this.mySentTradeRequests = data;
      })
  }

  getTradeRequestForUser() {
    this.userService.getTradeRequestForUser()
      .subscribe(data => {
        this.tradeRequestForUser = data;
        this.getMyBooks();
        this.getOtherBooks();
        this.getBooks("id");
      })
  }

  getBooks(sort): void {
    this.bookService.getBooks(sort)
      .then(data => {
        this.books = data;
        if (this.isLoggedIn) {
          this.getMyBooks();
          this.getOtherBooks()
        }
      })
      .catch(error => {
        console.log("Error occurred in ngOnInit - bookComponent");
      });
  }

  setBookForTrade(book) {
    this.targetBookId = 0;
    this.myBookForTrade = book;
    this.myBook = book.user.username === this.username;
  }

  cancelRequest(tradeRequest) {
    this.userService.removeTradeRequest(tradeRequest.id)
      .subscribe(res => {
        this.getMySentTradeRequests();
        this.getTradeRequestForUser();
      })
  }

  sendTradeRequest() {
    if (this.targetBookId != 0) {
      if (!(this.myBookForTrade.user.username === this.username)) {
        let myBook = this.targetBookId;
        this.targetBookId = this.myBookForTrade.id;
        this.myBookForTrade.id = myBook;
      }
      this.userService.sendTradeRequest(this.myBookForTrade.id, this.targetBookId)
        .subscribe(res => {
          this.getMySentTradeRequests();
          this.getMyBooks();
          this.getOtherBooks();
        })
    }
  }

  search(searchKey) {
    if (searchKey === "") {
      this.getBooks("id");
    }
    else {
      this.bookService.search(searchKey)
        .subscribe(data => {
          this.books = data;
        })
    }
  }
}
