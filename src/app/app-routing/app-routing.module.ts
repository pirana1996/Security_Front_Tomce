import{ NgModule } from '@angular/core';
import {Route, RouterModule} from "@angular/router";
import {BookComponent} from "../book/book.component"
import {BookDetailsComponent} from "../book-details/book-details.component";
import {NewBookComponent} from "../new-book/new-book.component";
import {AuthenticationComponent} from "../authentication/authentication.component";
import {SignUpComponent} from "../sign-up/sign-up.component";
import { AuthGuard } from '../guards/auth.guard';
import { UserBooksComponent } from '../user-books/user-books.component';
import {UserProfileComponent} from '../user-profile/user-profile.component';
const routes: Route[] = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BookComponent
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent
  },
  {
    path: 'addBook',
    component: NewBookComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'myBooks',
    component: UserBooksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'signUp',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: UserProfileComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
