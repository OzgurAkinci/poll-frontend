import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import {AuthenticationService, UserService} from '@app/_services';
import {User} from "@app/_models";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    user: User;
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        const auth = this.authenticationService.authValue;
        if (auth) {
          return true;
        }else{
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
    }
}
