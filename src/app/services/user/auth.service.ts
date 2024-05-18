import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user/user';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken())

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('token')
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable()
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value)
  }

  errorHandler(error: any) {
    let errorMessage = ""
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message
    } else {
      errorMessage = JSON.stringify(error.error)
    }
    return throwError(() => errorMessage)
  }


  login(user: User): Observable<any> {
    return this.httpClient
      .post("/auths/login", JSON.stringify(user), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  logout(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    this.setLoggedIn(false)
  }
}
