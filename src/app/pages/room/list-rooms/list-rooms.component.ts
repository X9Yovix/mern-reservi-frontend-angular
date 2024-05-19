import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MeetingCardsComponent } from '../../../components/meeting-cards/meeting-cards.component';
import { RoomService } from '../../../services/room/room.service';
import { Router } from '@angular/router';
import { Room } from '../../../interfaces/room/room';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [
    CommonModule,
    MeetingCardsComponent
  ],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.css'
})
export class ListRoomsComponent {
  currentPage = 1
  itemsPerPage = 6
  rooms = [] as Room[]
  totalPages!: number
  totalPagesArray: number[] = []

  constructor(
    private roomService: RoomService,
    private router: Router
  ) { }

  ngOnInit() {
    if (localStorage.getItem("token") === null) {
      this.router.navigateByUrl("/login")
    }
    this.fetchRooms(this.currentPage)
  }

  fetchRooms(page: number) {
    this.roomService.fetchRooms(page)
      .subscribe((res: any) => {
        this.rooms = res.meeting_rooms
        this.totalPages = res.total_pages
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1)
        this.currentPage = page
      });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.fetchRooms(page)
    }
  }

  updatePaginatedRooms() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.rooms.length)
    this.rooms = this.rooms.slice(startIndex, endIndex)
  }

}
