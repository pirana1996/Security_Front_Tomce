import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../services/book.service";
import {Book} from "../models/book.model";

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  private book : Book;

  constructor(
    private bookService : BookService,
    private route : ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = +params.get("id");
      this.getBook(id);
    });
  }

  getBook(bookId) {
    return this.bookService.getBook(bookId)
      .subscribe(book => this.book = book);
  }

}
