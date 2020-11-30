import { Component } from '@angular/core';

import {AuthenticationService, UserService} from './_services';
import {User, RoleEnum} from './_models';
import {Auth} from '@app/_models/auth';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    auth: Auth;
    isAdmin = false;
    constructor(private authenticationService: AuthenticationService) {
      this.authenticationService.auth.subscribe((d) => {
          this.auth = d;
          this.isAdmin = this.auth && this.auth.roles && (d.roles.findIndex(r => r.roleName === RoleEnum.ADMIN) !== -1);
      });
    }

    logout(): any {
        this.authenticationService.logout();
    }
}
