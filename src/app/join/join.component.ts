import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OptionService} from '../_services/option.service';
import {QuestionService} from '../_services/question.service';
import {Location} from '@angular/common';
import {Poll} from '../_models/poll';
import {PollService} from '../_services/poll.service';
import {TempQuestion} from '@app/_models/temp_question';

@Component({
  selector: 'app-join',
  templateUrl: 'join.component.html',
  animations: []
})
export class JoinComponent implements OnInit {
    loading = false;
    sub: Subscription;
    poll: Poll;
    tempQuestions: TempQuestion[] = [];

    constructor(private route: ActivatedRoute, private optionService: OptionService, private questionService: QuestionService,
                private toastr: ToastrService, private pollService: PollService, private location: Location) { }

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
      this.pollService.get(id).subscribe(data => {
        this.poll = data;
      });
    }


    goBack(): void {
    this.location.back();
    }

    radioChecked(id, i): any{
     /* this.poll.questions.forEach(item => {
        if (item.id !== id){
          item.selected = false;
        }else{
          item.selected = true;
        }
      });*/
    }

    save(): void {

    }
}
