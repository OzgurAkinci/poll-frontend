import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import {Option} from '../_models/option';

@Injectable({ providedIn: 'root' })
export class JoinService {
    constructor(private http: HttpClient) { }

    getByPollId(pollId: number): any {
        return this.http.get<Option[]>(`${environment.apiUrl}/join/get/` + pollId);
    }
}
