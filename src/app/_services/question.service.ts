import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import {Question} from '../_models/question';

@Injectable({ providedIn: 'root' })
export class QuestionService {
    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<Question[]>(`${environment.apiUrl}/question/list`);
    }

    get(id: number): any {
      return this.http.get<Question>(`${environment.apiUrl}/question/get/` + id);
    }

    save(post: Question): Observable<Question> {
      return this.http.post<Question>(environment.apiUrl + '/question/save/', post);
    }

    delete(id: number): any {
      return this.http.delete(environment.apiUrl + '/question/delete/' + id);
    }
}
