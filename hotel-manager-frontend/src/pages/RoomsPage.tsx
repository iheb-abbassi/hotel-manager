import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { deleteRoom, listRooms, getRoom } from '../api/rooms'
import RoomTable from '../components/RoomTable'
import type { RoomType } from '../types'

export default function RoomsPage() {
  // Local filter state
  const [filterType, setFilterType] = useState<RoomType | ''>('')
  const [filterMinibar, setFilterMinibar] = useState<'' | 'true' | 'false'>('')
  const [filterAvailable, setFilterAvailable] = useState<'' | 'true' | 'false'>('')
  const [filterRoomNumber, setFilterRoomNumber] = useState('')
  // Applied filter state
  const [type, setType] = useState<RoomType | ''>('')
  const [hasMinibar, setHasMinibar] = useState<'' | 'true' | 'false'>('')
  const [available, setAvailable] = useState<'' | 'true' | 'false'>('')
  const [roomNumber, setRoomNumber] = useState('')
  const [page, setPage] = useState(0)
  const size = 7

  const query = useQuery({
    queryKey: ['rooms', {type, hasMinibar, available, page, size}],
    queryFn: () => listRooms({
      type: type || undefined,
      hasMinibar: hasMinibar === '' ? undefined : hasMinibar === 'true',
      available: available === '' ? undefined : available === 'true',
      page, size, sort: 'number,asc'
    })
  })

  // Separate query for searching a specific room by number
  const roomSearchQuery = useQuery({
    queryKey: ['room-search', roomNumber],
    queryFn: () => getRoom(Number(roomNumber)),
    enabled: !!roomNumber && !isNaN(Number(roomNumber)),
    retry: false
  })

  const qc = useQueryClient()
  const del = useMutation({
    mutationFn: (n: number) => deleteRoom(n),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['rooms'] })
  })

  const totalPages = query.data?.totalPages ?? 1

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Rooms</h1>
        <Link 
          to="/rooms/new"
          className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold transition-colors"
          title="Add Room"
        >
          +
        </Link>
      </div>

      <div className="flex gap-3 items-end">
        <div>
          <label className="block text-sm">Room Number</label>
          <input 
            type="text" 
            value={filterRoomNumber} 
            onChange={e => setFilterRoomNumber(e.target.value)} 
            placeholder="Search by number"
            className="border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm">Type</label>
          <select value={filterType} onChange={e => setFilterType(e.target.value as any)} className="border rounded px-3 py-2">
            <option value="">Any</option>
            <option value="SINGLE">SINGLE</option>
            <option value="DOUBLE">DOUBLE</option>
            <option value="SUITE">SUITE</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Minibar</label>
          <select value={filterMinibar} onChange={e => setFilterMinibar(e.target.value as any)} className="border rounded px-3 py-2">
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <div>
          <label className="block text-sm">Available</label>
          <select value={filterAvailable} onChange={e => setFilterAvailable(e.target.value as any)} className="border rounded px-3 py-2">
            <option value="">Any</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button
          onClick={() => {
            if (filterRoomNumber) {
              // If searching by room number, only apply room number search
              setRoomNumber(filterRoomNumber)
              setType('')
              setHasMinibar('')
              setAvailable('')
            } else {
              // Otherwise apply filters normally
              setType(filterType)
              setHasMinibar(filterMinibar)
              setAvailable(filterAvailable)
              setRoomNumber('')
            }
            setPage(0)
          }}
          className="bg-gray-800 text-white rounded px-4 py-2"
        >Apply</button>
        <button
          onClick={() => {
            setFilterType('')
            setFilterMinibar('')
            setFilterAvailable('')
            setFilterRoomNumber('')
            setType('')
            setHasMinibar('')
            setAvailable('')
            setRoomNumber('')
            setPage(0)
          }}
          className="bg-gray-500 text-white rounded px-4 py-2"
        >Clear Filters</button>
      </div>

      {roomNumber ? (
        // Show search results for specific room
        roomSearchQuery.isLoading ? <p>Searching...</p> : 
        roomSearchQuery.isError ? <p className="text-red-600">Room {roomNumber} not found</p> :
        roomSearchQuery.data ? <RoomTable rooms={[roomSearchQuery.data]} onDelete={(n) => del.mutate(n)} /> :
        null
      ) : (
        // Show regular room list with filters
        query.isLoading ? <p>Loading...</p> : query.isError ? <p className="text-red-600">Failed to load rooms</p> :
        <RoomTable rooms={query.data!.content} onDelete={(n) => del.mutate(n)} />
      )}

      {!roomNumber && (
        <div className="flex items-center gap-3">
          <button disabled={page<=0} onClick={() => setPage(p => Math.max(0, p-1))} className="border rounded px-3 py-1 disabled:opacity-50">Prev</button>
          <span className="text-sm">Page {page+1} / {totalPages}</span>
          <button disabled={page+1>=totalPages} onClick={() => setPage(p => p+1)} className="border rounded px-3 py-1 disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  )
}
