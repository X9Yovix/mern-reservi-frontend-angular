import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../../services/room/room.service';
import { Room } from '../../../interfaces/room/room';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import Validation from '../../../utils/validation';

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
    private toast: HotToastService
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
  }
}