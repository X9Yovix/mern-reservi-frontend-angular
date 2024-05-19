import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
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


  fetchRooms(page: number): Observable<any> {
    return this.httpClient
      .get(`/meeting_rooms/method/pagination?page=${page}`)
      .pipe(
        catchError(this.errorHandler)
      )
  }
}
