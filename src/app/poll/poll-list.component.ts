import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {PollService} from '../_services/poll.service';
import {Poll} from '../_models/poll';
import {RoleEnum} from "@app/_models";

@Component({
  selector: 'app-poll-list',
  templateUrl: 'poll-list.component.html'
})
export class PollListComponent implements OnInit {
    loading = false;
    polls: Poll[] = [];

    constructor(private pollService: PollService) { }

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
