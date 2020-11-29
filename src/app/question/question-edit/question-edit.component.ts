import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Question} from '../../_models/question';
import {QuestionService} from '@app/_services/question.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-question-edit',
  templateUrl: 'question-edit.component.html',
  animations: []
})
export class QuestionEditComponent implements OnInit {
    loading = false;
    question: Question = new Question();
    sub: Subscription;

    constructor(private route: ActivatedRoute, private questionService: QuestionService, private toastr: ToastrService,
                private location: Location) { }

    ngOnInit(): any {
      this.sub = this.route.params.subscribe(params => {
        if (params.id) {
          const id = params.id;
          if (!isNaN(id)) {
            this.loadData(id);
          } else {
            this.question = new Question();
          }
        }
      });
    }

    loadData(id: number): any {
      this.questionService.get(id).subscribe(data => {
        this.question = data;
      });
    }

  save(): any {
    this.questionService.save(this.question).subscribe(data => {
      this.question = data;
      this.toastr.success('Successfully Saved');
    }, e => {
      this.toastr.error('Error: ' + JSON.stringify(e.error));
    });
  }

  goBack(): void {
    this.location.back();
  }
}
