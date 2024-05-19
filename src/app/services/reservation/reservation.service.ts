import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Reservation } from '../../interfaces/reservation/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

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
      errorMessage = error.error.message
    } else {
      errorMessage = JSON.stringify(error.error)
    }
    return throwError(() => errorMessage)
  }


  reservation(reservation: any): Observable<any> {
    return this.httpClient
      .post(`/reservations`, JSON.stringify(reservation), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
}
