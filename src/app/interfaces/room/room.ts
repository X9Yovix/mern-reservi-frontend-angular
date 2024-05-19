import { Category } from "../category/category"
import { Material } from "../material/material"

export interface Room {
  _id: number,
  name: string,
  description: string,
  length: number,
  width: number,
  height: number,
  availability: boolean,
  capacity: number,
  images: string[],
  categories: Category[],
  materials: Material[],
  is_deleted: boolean,
}
