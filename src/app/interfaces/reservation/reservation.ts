import { Room } from "../room/room"
import { User } from "../user/user"

export interface Reservation {
  participants: number,
  start_date: Date,
  end_date: Date,
  additional_info: string,
  status: string,
  meeting_rooms: Room[],
  users: User[]
}