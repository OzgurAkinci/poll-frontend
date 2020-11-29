import {Component, OnInit} from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit{
    loading = false;
    user: User;

    constructor(
        private userService: UserService,
    ) {}

    ngOnInit(): any {
        this.loading = true;
        this.userService.getCurrentUser().pipe(first()).subscribe(user => {
            this.loading = false;
            this.user = user;
        });
    }
}
