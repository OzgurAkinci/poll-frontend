import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Poll} from '../_models/poll';
import {Observable} from 'rxjs';
import {PollResult} from '@app/_models/poll-result';

@Injectable({ providedIn: 'root' })
export class PollService {
    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<Poll[]>(`${environment.apiUrl}/poll/list`);
    }

    get(id: number): any {
      return this.http.get<Poll>(`${environment.apiUrl}/poll/get/` + id);
    }

    save(post: Poll): Observable<Poll> {
      return this.http.post<Poll>(environment.apiUrl + '/poll/save/', post);
    }

    delete(id: number): any {
      return this.http.delete(environment.apiUrl + '/poll/delete/' + id);
    }

    getPollResult(id: number): any {
      return this.http.get<PollResult[]>(environment.apiUrl + '/poll/getPollResult/' + + id);
    }

}
