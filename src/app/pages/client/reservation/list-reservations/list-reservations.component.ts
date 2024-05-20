import { Component, OnInit } from '@angular/core';
import { Reservation } from '../../../../interfaces/reservation/reservation';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { JwtPayload } from '../../../../interfaces/jwt/jwt-payload';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-list-reservations',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './list-reservations.component.html',
  styleUrl: './list-reservations.component.css'
})
export class ListReservationsComponent implements OnInit {
  currentPage = 1
  itemsPerPage = 6
  reservations: Reservation[] = []
  totalPages!: number
  totalPagesArray: number[] = []

  constructor(
    private reservationService: ReservationService,
    private toast: HotToastService
  ) { }

  ngOnInit() {
    this.fetchMyReservations(this.currentPage)
  }

  fetchMyReservations(page: number) {
    const token = localStorage.getItem('token')
    if (token) {
      const userId = jwtDecode<JwtPayload>(token)?._id
      this.reservationService.fetchMyReservations(page, this.itemsPerPage, userId!)
        .pipe(
          this.toast.observe({
            loading: { content: 'Loading reservations...', position: 'bottom-center' },
            success: { content: 'Reservations loaded', position: 'bottom-center', duration: 1000 },
            error: { content: 'Failed to load reservations', position: 'bottom-center', duration: 1000 }
          })
        )
        .subscribe({
          complete: () => {
          },
          error: (err) => {
            this.toast.error(`${JSON.parse(err).error}`)
          },
          next: (res) => {
            this.reservations = []
            res.reservations.forEach((item: any) => {
              this.reservations.push({
                _id: item._id,
                participants: item.participants,
                start_date: new Date(item.start_date),
                end_date: new Date(item.end_date),
                additional_info: item.additional_info,
                status: item.status,
                meeting_rooms: item.meeting_rooms,
                users: item.users
              })
            })
            this.currentPage = page
            this.totalPages = res.total_pages
            this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1)
          }
        })
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchMyReservations(page)
    }
  }

  updatePaginatedRooms() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.reservations.length)
    this.reservations = this.reservations.slice(startIndex, endIndex)
  }

  cancelReservation(id: string) {
    this.reservationService.cancelReservation(id)
      .pipe(
        this.toast.observe({
          loading: { content: 'Loading...', position: 'bottom-center' },
          success: { content: 'Reservation canceled', position: 'bottom-center', duration: 2000 },
          error: { content: 'Failed to cancel reservation', position: 'bottom-center', duration: 2000 }
        })
      )
      .subscribe({
        complete: () => {
        },
        error: (err) => {
          this.toast.error(`${JSON.parse(err).error}`, { position: 'bottom-center' })
        },
        next: (res) => {
          this.fetchMyReservations(this.currentPage)
        }
      })
  }
}
