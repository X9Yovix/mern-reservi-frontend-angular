import { Component, Input } from '@angular/core';
import { Room } from '../../interfaces/room/room';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-meeting-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meeting-cards.component.html',
  styleUrl: './meeting-cards.component.css'
})
export class MeetingCardsComponent {
  @Input() room!: Room
  @Input() key!: number

  backendUrl: string = 'http://localhost:4000'

  getCarouselId() {
    return 'room' + this.key
  }

  getFullImageUrl(imagePath: string): string {
    return `${this.backendUrl}/${imagePath}`
  }

  viewRoom(roomId: number) {
    console.log('Viewing room', roomId)
  }
}
