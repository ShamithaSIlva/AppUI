import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';
import {CLIENT_SECRET_VALUE, CLIENT_ID_VALUE } from '@app/constants/auth.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(username: string, password: string) {

    const headers = {
        'Authorization': 'Basic ' + btoa(CLIENT_ID_VALUE+":"+CLIENT_SECRET_VALUE),
        'Content-type': 'application/x-www-form-urlencoded'
      }

    const body = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');

    return this.http.post(environment.apiUrl+'/oauth/token', body, {headers})
    .pipe(map(data => {
              let user:User = {username,password}
              user.authdata = window.btoa(username + ':' + password);
              user.authToken = data["access_token"];
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
  }
}
