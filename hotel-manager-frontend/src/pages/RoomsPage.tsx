import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteRoom, listRooms } from '../api/rooms'
import RoomTable from '../components/RoomTable'
import type { RoomType } from '../types'

export default function RoomsPage() {
  // Local filter state
  const [filterType, setFilterType] = useState<RoomType | ''>('')
  const [filterMinibar, setFilterMinibar] = useState<'' | 'true' | 'false'>('')
  const [filterAvailable, setFilterAvailable] = useState<'' | 'true' | 'false'>('')
  // Applied filter state
  const [type, setType] = useState<RoomType | ''>('')
  const [hasMinibar, setHasMinibar] = useState<'' | 'true' | 'false'>('')
  const [available, setAvailable] = useState<'' | 'true' | 'false'>('')
  const [page, setPage] = useState(0)
  const size = 20

  const query = useQuery({
    queryKey: ['rooms', {type, hasMinibar, available, page, size}],
    queryFn: () => listRooms({
      type: type || undefined,
      hasMinibar: hasMinibar === '' ? undefined : hasMinibar === 'true',
      available: available === '' ? undefined : available === 'true',
      page, size, sort: 'number,asc'
    })
  })

  const qc = useQueryClient()
  const del = useMutation({
    mutationFn: (n: number) => deleteRoom(n),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['rooms'] })
  })

  const totalPages = query.data?.totalPages ?? 1

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Rooms</h1>

      <div className="flex gap-3 items-end">
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
            setType(filterType)
            setHasMinibar(filterMinibar)
            setAvailable(filterAvailable)
            setPage(0)
          }}
          className="bg-gray-800 text-white rounded px-4 py-2"
        >Apply</button>
        <button
          onClick={() => {
            setFilterType('')
            setFilterMinibar('')
            setFilterAvailable('')
            setType('')
            setHasMinibar('')
            setAvailable('')
            setPage(0)
          }}
          className="bg-gray-500 text-white rounded px-4 py-2"
        >Clear Filters</button>
      </div>

      {query.isLoading ? <p>Loading...</p> : query.isError ? <p className="text-red-600">Failed to load rooms</p> :
        <RoomTable rooms={query.data!.content} onDelete={(n) => del.mutate(n)} />
      }

      <div className="flex items-center gap-3">
        <button disabled={page<=0} onClick={() => setPage(p => Math.max(0, p-1))} className="border rounded px-3 py-1 disabled:opacity-50">Prev</button>
        <span className="text-sm">Page {page+1} / {totalPages}</span>
        <button disabled={page+1>=totalPages} onClick={() => setPage(p => p+1)} className="border rounded px-3 py-1 disabled:opacity-50">Next</button>
      </div>
    </div>
  )
}
