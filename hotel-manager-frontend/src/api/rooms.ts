import type { RoomDTO, RoomType, Page } from '../types'

const BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

function qs(params: Record<string, any>) {
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') sp.append(k, String(v))
  })
  return sp.toString()
}

export async function listRooms(opts: {type?: RoomType, hasMinibar?: boolean, available?: boolean, page?: number, size?: number, sort?: string} = {}): Promise<Page<RoomDTO>> {
  const query = qs(opts)
  const res = await fetch(`${BASE}/api/rooms${query ? `?${query}` : ''}`)
  if (!res.ok) throw new Error('Failed to fetch rooms')
  return res.json()
}

export async function getRoom(number: number): Promise<RoomDTO> {
  const res = await fetch(`${BASE}/api/rooms/${number}`)
  if (!res.ok) throw new Error('Room not found')
  return res.json()
}

export async function createRoom(room: RoomDTO): Promise<RoomDTO> {
  const res = await fetch(`${BASE}/api/rooms`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(room)
  })
  if (!res.ok) throw new Error('Failed to create room')
  return res.json()
}

export async function updateRoom(number: number, room: RoomDTO): Promise<RoomDTO> {
  const res = await fetch(`${BASE}/api/rooms/${number}`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(room)
  })
  if (!res.ok) throw new Error('Failed to update room')
  return res.json()
}

export async function deleteRoom(number: number): Promise<void> {
  const res = await fetch(`${BASE}/api/rooms/${number}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete room')
}
