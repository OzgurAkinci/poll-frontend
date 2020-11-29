import { Component } from '@angular/core';

import {AuthenticationService, UserService} from './_services';
import {User, RoleEnum} from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    user: User;

    constructor(private authenticationService: AuthenticationService, private userService: UserService) {
        this.userService.getCurrentUser().subscribe(x => this.user = x);
    }

    get isAdmin(): any {
        return this.user && (this.user.roles.findIndex(d => d.roleName === RoleEnum.ADMIN) !== -1);
    }

    logout(): any {
        this.authenticationService.logout();
    }
}
