export type RoomType = 'SINGLE' | 'DOUBLE' | 'SUITE'

export interface RoomDTO {
  number: number
  type: RoomType
  hasMinibar: boolean
  available: boolean
}

export interface Page<T> {
  content: T[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
