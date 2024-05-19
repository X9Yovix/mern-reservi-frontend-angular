import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../../services/room/room.service';
import { Room } from '../../../../interfaces/room/room';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import Validation from '../../../../utils/validation';
import { ReservationService } from '../../../../services/reservation/reservation.service';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../../../interfaces/jwt/jwt-payload';

@Component({
  selector: 'app-detail-room',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './detail-room.component.html',
  styleUrl: './detail-room.component.css'
})
export class DetailRoomComponent implements OnInit {
  backendUrl: string = "http://localhost:4000"
  room!: Room
  form!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private toast: HotToastService,
    private datePipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.fetchRoom()
    this.createForm()
  }

  fetchRoom() {
    const roomId = this.route.snapshot.paramMap.get('id')
    if (roomId !== null) {
      this.roomService.fetchRoom(roomId)
        .subscribe((res: any) => {
          this.room = res.meeting_room
        })
    } else {
      this.router.navigateByUrl('/rooms/list')
    }
  }

  getFullImageUrl(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`
  }

  createForm() {
    this.form = this.formBuilder.group(
      {
        participants: ['', [Validators.required, Validators.min(1)]],
        reservationStart: ['', [Validators.required]],
        reservationEnd: ['', [Validators.required]],
        additionalInfo: ['', []],
      },
      {
        validators: [Validation.valideEndDate('reservationStart', 'reservationEnd')]
      }
    )

    this.form.get('reservationStart')?.valueChanges.subscribe(() => {
      this.form.get('reservationEnd')?.updateValueAndValidity()
    })
  }

  get getFormValues() {
    return this.form.controls
  }

  onSubmit() {
    let loadingToastId = this.toast.loading('Loading....')
    const token = localStorage.getItem('token')
    if (token === null) {
      this.toast.error("You need to login first")
      return
    } else {
      const decoded = jwtDecode<JwtPayload>(token)
      const userId = decoded._id
      const inputStartDate = this.formatDate(this.form.value.reservationStart)
      const inputEndDate = this.formatDate(this.form.value.reservationEnd)
      const data = {
        participants: this.form.value.participants,
        additional_info: this.form.value.additional_info || "",
        reservation_range: [inputStartDate, inputEndDate],
        users: userId,
        meeting_rooms: this.route.snapshot.paramMap.get('id')
      }
      this.reservationService.reservation(data)
        .subscribe({
          complete: () => {
          },
          error: (err) => {
            loadingToastId.close()
            this.toast.error(`${JSON.parse(err).error}`)
          },
          next: (res) => {
            loadingToastId.close()
            this.toast.success(`${res.message}`, { duration: 2000 })
            this.form.reset()
            //this.router.navigateByUrl('/reservations/client/list')
          }
        })
    }
  }

  formatDate(input: string) {
    return this.datePipe.transform(input, 'EEE MMM dd yyyy HH:mm:ss \'GMT\'Z (z)')
  }
}