import {Injectable, OnInit} from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthenticationService} from "../services/authentication.service";
import 'rxjs/add/operator/map'

@Injectable()
export class AuthGuard implements CanActivate{

  constructor(
    private authService : AuthenticationService,
    private router: Router){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let url : string = state.url;

    return this.authService.getPrincipals()
      .map(user => {
        if (user !== "N/A")
          return true;
        else {
          this.authService.redirectUrl = url;
          this.router.navigate(['/login']);
          return false;
        }
      });
  }
}
