import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User } from '@app/_models';

const OAUTH_CLIENT = 'poll';
const OAUTH_SECRET = 'poll';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(OAUTH_CLIENT + ':' + OAUTH_SECRET)
  })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private authSubject: BehaviorSubject<any>;
    public auth: Observable<any>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private route: ActivatedRoute,
    ) {
        this.authSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('auth')));
        this.auth = this.authSubject.asObservable();
    }

    public get authValue(): any {
      return this.authSubject.value;
    }

    login(username: string, password: string): any {
      const body = new HttpParams()
        .set('username', username)
        .set('password', password)
        .set('grant_type', 'password');

      return this.http.post<any>(`${environment.apiUrl}/oauth/token`, body, HTTP_OPTIONS)
            .pipe(map(auth => {
                const currentUser = auth;
                localStorage.setItem('auth', JSON.stringify(currentUser));
                this.authSubject.next(currentUser);
                this.getCurrentUser().subscribe(user => {
                  currentUser.user = user;
                  localStorage.setItem('auth', JSON.stringify(currentUser));
                  this.authSubject.next(currentUser);
                  const returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
                  this.router.navigateByUrl(returnUrl);
                });
            }));
    }

    logout(): any {
        // remove user from local storage to log user out
        localStorage.removeItem('auth');
        this.authSubject.next(null);
        this.router.navigate(['/login']);
    }

    getCurrentUser(): Observable<User> {
      const httpOptions = {
        headers: new HttpHeaders({})
      };
      return this.http.get<User>(environment.apiUrl + '/user/currentUser', httpOptions);
    }
}
