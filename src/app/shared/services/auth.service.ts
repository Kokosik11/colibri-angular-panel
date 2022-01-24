import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import {Observable} from "rxjs";
import { tap } from 'rxjs/operators'

import { User } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private token: string = '';

    constructor(private http: HttpClient) {
      this.http = http;
    }

    signin(user: User): Observable<{token: string}> {
        return this.http.post<{token: string}>('/api/user/login', user)
          .pipe(
            tap(({ token }) => {
              localStorage.setItem('auth-token', token);
              this.setToken(token);
            })
          );
    }

    setToken(token: string): void {
      this.token = token;
    }

    getToken(): string {
      return this.token;
    }

    isAuthenticated(): boolean {
      return !!this.token;
    }

    logout() {
      this.setToken('');
      localStorage.clear();
    }

    verifyToken(): Observable<any> {
      return this.http.get<{token: string}>('/api/user/verify')
    }
}
