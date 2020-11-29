import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from '@environments/environment';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponseService {
    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<Response[]>(`${environment.apiUrl}/response/list`);
    }

    get(id: number): any {
      return this.http.get<Response>(`${environment.apiUrl}/response/get/` + id);
    }

    save(response: Response): Observable<Response> {
      return this.http.post<Response>(environment.apiUrl + '/response/save/', response);
    }

    delete(id: number): any {
      return this.http.delete(environment.apiUrl + '/response/delete/' + id);
    }
}
