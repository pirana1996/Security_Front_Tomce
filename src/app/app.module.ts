import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {BookService} from "./services/book.service";
import { BookDetailsComponent } from './book-details/book-details.component';
import { NewBookComponent } from './new-book/new-book.component';
import { ImageUploadModule } from '../../node_modules/angular2-image-upload/src/image-upload.module';
import { AuthenticationComponent } from './authentication/authentication.component'
import {AuthenticationService} from './services/authentication.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import  { AuthGuard } from './guards/auth.guard';
import {UserService} from './services/user.service';
import  {AuthorService} from './services/author.service';
import { NavComponent } from './nav/nav.component';
import { UserBooksComponent } from './user-books/user-books.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TitlePipe } from './pipes/title.pipe';
import { ArrayPipe } from './pipes/array.pipe';
import {NgxPaginationModule} from "../../node_modules/ngx-pagination/";
import {RatingModule} from "ngx-rating";



@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    BookDetailsComponent,
    NewBookComponent,
    AuthenticationComponent,
    SignUpComponent,
    NavComponent,
    UserBooksComponent,
    UserProfileComponent,
    TitlePipe,
    ArrayPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    NgxPaginationModule,
    AppRoutingModule,
    RatingModule,
    ImageUploadModule.forRoot()
  ],
  providers: [BookService, AuthenticationService, AuthGuard, UserService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
