import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {PollService} from '../_services/poll.service';
import {Poll} from '../_models/poll';
import {Auth} from "@app/_models/auth";
import {RoleEnum} from "@app/_models";
import {AuthenticationService} from "@app/_services";

@Component({
  selector: 'app-poll-list',
  templateUrl: 'poll-list.component.html'
})
export class PollListComponent implements OnInit {
    loading = false;
    polls: Poll[] = [];
    auth: Auth;
    isAdmin = false;

    constructor(private pollService: PollService, private authenticationService: AuthenticationService) {
      this.authenticationService.auth.subscribe((d) => {
        this.auth = d;
        this.isAdmin = this.auth && this.auth.roles && (d.roles.findIndex(r => r.roleName === RoleEnum.ADMIN) !== -1);
      });
    }

    ngOnInit(): any {
        this.loadData();
    }

    loadData(): any {
      this.loading = true;
      this.pollService.getAll().pipe(first()).subscribe(polls => {
        this.loading = false;
        this.polls = polls;
      });
    }

    delete(id): any {
      this.pollService.delete(id).subscribe(data => {
        this.loadData();
      });
    }
}
