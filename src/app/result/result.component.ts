import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Location} from '@angular/common';
import {QuestionService} from '@app/_services/question.service';
import {PollService} from '../_services/poll.service';
import {PollResult} from '../_models/poll-result';

@Component({
  selector: 'app-option-edit',
  templateUrl: 'result.component.html',
  animations: []
})
export class ResultComponent implements OnInit {
    loading = false;
    sub: Subscription;
    pollResult: PollResult[];

    constructor(private route: ActivatedRoute, private pollService: PollService, private questionService: QuestionService,
                private toastr: ToastrService, private location: Location) { }

    ngOnInit(): any {
      this.sub = this.route.params.subscribe(params => {
        if (params.id) {
          const id = params.id;
          if (!isNaN(id)) {
            this.loadData(id);
          }
        }
      });
    }

    loadData(id: number): any {
      this.loading = true;
      this.pollService.getPollResult(id).subscribe(data => {
        this.loading = false;
        this.pollResult = data;
      }, e => {
        this.loading = false;
      });
    }


    goBack(): void {
      this.location.back();
    }
}
