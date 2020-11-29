import { Component, OnInit } from '@angular/core';

import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {OptionService} from '../../_services/option.service';
import {Option} from '../../_models/option';
import {Location} from '@angular/common';
import {QuestionService} from '@app/_services/question.service';

@Component({
  selector: 'app-option-edit',
  templateUrl: 'option-edit.component.html',
  animations: []
})
export class OptionEditComponent implements OnInit {
    loading = false;
    option: Option = new Option();
    sub: Subscription;

    constructor(private route: ActivatedRoute, private optionService: OptionService, private questionService: QuestionService,
                private toastr: ToastrService, private location: Location) { }

    ngOnInit(): any {
      this.sub = this.route.params.subscribe(params => {
        if (params.id) {
          const id = params.id;
          if (!isNaN(id)) {
            this.loadData(id);
          } else {
            this.option = new Option();
            this.questionService.get(Number(params.questionId)).subscribe(question => {
              this.option.question = question;
            });
          }
        }
      });
    }

    loadData(id: number): any {
      this.optionService.get(id).subscribe(data => {
        this.option = data;
      });
    }

  save(): any {
    this.optionService.save(this.option).subscribe(data => {
      this.option = data;
      this.toastr.success('Successfully Saved');
    }, e => {
      this.toastr.error('Error: ' + JSON.stringify(e.error));
    });
  }

  goBack(): void {
    this.location.back();
  }
}
