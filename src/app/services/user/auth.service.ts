import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user/user';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = "http://localhost:4000/api"

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  errorHandler(error: any) {
    let errorMessage = ""
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = JSON.stringify(error.error);
    }
    return throwError(() => errorMessage);
  }


  login(user: User): Observable<any> {
    return this.httpClient
      .post(this.BASE_URL + "/auths/login", JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
}
