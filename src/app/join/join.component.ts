import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OptionService} from '../_services/option.service';
import {QuestionService} from '../_services/question.service';
import {Location} from '@angular/common';
import {PollService} from '../_services/poll.service';
import {JoinResultQuestion} from '@app/_models/join-result-question';
import {JoinService} from '@app/_services/join.service';

@Component({
  selector: 'app-join',
  templateUrl: 'join.component.html',
  animations: []
})
export class JoinComponent implements OnInit {
    loading = false;
    sub: Subscription;
    joinResultQuestions: JoinResultQuestion[] = [];

    constructor(private route: ActivatedRoute, private optionService: OptionService, private questionService: QuestionService,
                private toastr: ToastrService, private joinService: JoinService, private pollService: PollService,
                private location: Location) { }

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
      this.joinService.getByPollId(id).subscribe(data => {
        this.joinResultQuestions = data;
        this.loading = false;
      }, e => {
        this.loading = false;
        this.toastr.error('Error: ' + JSON.stringify(e.error));
      });
    }


    goBack(): void {
    this.location.back();
    }

    radioChecked(id, i): any{
      const d =  this.joinResultQuestions[i - 1].options.filter(x => x.optionId === id)[0];
      d.selected = !d.selected;
    }

    save(): void {
        this.loading = true;
        this.joinService.save(this.joinResultQuestions).subscribe(data => {
          this.loading = false;
          this.joinResultQuestions = data;
          this.toastr.success('Successfully Saved');
        }, e => {
          this.loading = false;
          this.toastr.error('Error: ' + JSON.stringify(e.error));
        });
    }
}
