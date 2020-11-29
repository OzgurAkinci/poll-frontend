import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {Poll} from '@app/_models/poll';
import {PollService} from '@app/_services/poll.service';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {QuestionService} from "@app/_services/question.service";

@Component({
  selector: 'app-poll-edit',
  templateUrl: 'poll-edit.component.html',
  animations: []
})
export class PollEditComponent implements OnInit {
    loading = false;
    poll: Poll = new Poll();
    sub: Subscription;

    constructor(private route: ActivatedRoute, private pollService: PollService, private toastr: ToastrService,
                private location: Location, private questionService: QuestionService) { }

    ngOnInit(): any {
      this.sub = this.route.params.subscribe(params => {
        if (params.id) {
          const id = params.id;
          if (!isNaN(id)) {
            this.loadData(id);
          } else {
            this.poll = new Poll();
          }
        }
      });
    }

    loadData(id: number): any {
      this.pollService.get(id).subscribe(data => {
        this.poll = data;
      });
    }

    save(): any {
        this.pollService.save(this.poll).subscribe(data => {
          this.poll = data;
          this.toastr.success('Successfully Saved');
        }, e => {
          this.toastr.error('Error: ' + JSON.stringify(e.error));
        });
    }

    goBack(): void {
        this.location.back();
    }

    delete(id): any {
        this.questionService.delete(id).subscribe(data => {
            this.loadData(this.poll.id);
        });
    }
}
