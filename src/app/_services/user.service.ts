import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_models';
import {Observable} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): any {
        return this.http.get<User[]>(`${environment.apiUrl}/user/list`);
    }

    getCurrentUser(): Observable<User> {
      const httpOptions = {
        headers: new HttpHeaders({})
      };
      return this.http.get<User>(environment.apiUrl + '/user/currentUser', httpOptions);
    }
}
