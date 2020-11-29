import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';
import {Option} from '../_models/option';

@Injectable({ providedIn: 'root' })
export class OptionService {
    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<Option[]>(`${environment.apiUrl}/option/list`);
    }

    get(id: number): any {
      return this.http.get<Option>(`${environment.apiUrl}/option/get/` + id);
    }

    save(post: Option): Observable<Option> {
      return this.http.post<Option>(environment.apiUrl + '/option/save/', post);
    }

    delete(id: number): any {
      return this.http.delete(environment.apiUrl + '/option/delete/' + id);
    }
}
