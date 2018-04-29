import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import { Subscription } from 'rxjs/Subscription';
import {UserService} from "../services/user.service";
import {TradeRequest} from "../models/tradeRequest.model";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(
    private service : AuthenticationService,
    private userService : UserService){}

  authenticated : boolean;
  username : string;
  rating : number = 3;
  tradeRequestForUser : TradeRequest[];
  tradeRequestForReview : TradeRequest;

  ngOnInit() {
    this.service.user.subscribe(res => {
      if(res !== "N/A"){
        this.username = res;
        this.authenticated = true;
        this.getTradeRequestForUser();
        this.tradeRequestForReview = null;
      } else {
        this.authenticated = false;
      }
    })
  }

  logout() {
    this.service.logout()
      .subscribe(() => {
        this.authenticated = false;
        this.username = "N/A";
      })
  }

  getTradeRequestForUser() {
    this.userService.getTradeRequestForUser()
      .subscribe(data => {
        this.tradeRequestForUser = data;
      })
  }

  setTradeRequestForReview (tradeRequest) {
    this.tradeRequestForReview = tradeRequest;
  }

  rejectRequest() {
    if (this.tradeRequestForReview != null){
      this.userService.removeTradeRequest(this.tradeRequestForReview.id)
        .subscribe(res => {
          this.getTradeRequestForUser();
        })
    }
  }

  acceptRequest() {
    if (this.tradeRequestForReview != null) {
      this.userService.acceptTradeRequest(this.tradeRequestForReview.id)
        .subscribe(res => {
          this.getTradeRequestForUser();
        })
    }
  }

}
