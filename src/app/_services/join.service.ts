import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import {Option} from '../_models/option';
import {JoinResultQuestion} from '@app/_models/join-result-question';

@Injectable({ providedIn: 'root' })
export class JoinService {
    constructor(private http: HttpClient) { }

    getByPollId(pollId: number): any {
        return this.http.get<Option[]>(`${environment.apiUrl}/join/get/` + pollId);
    }

    save(joinResultQuestion: JoinResultQuestion[]): Observable<JoinResultQuestion[]> {
      return this.http.post<JoinResultQuestion[]>(environment.apiUrl + '/join/save/', joinResultQuestion);
    }
}
