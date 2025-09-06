import type { RoomDTO } from '../types'
import { Link } from 'react-router-dom'

export default function RoomTable({ rooms, onDelete, currentPage = 0, pageSize = 7 }: {
  rooms: RoomDTO[]
  onDelete: (number: number) => void
  currentPage?: number
  pageSize?: number
}) {
  return (
    <div className="overflow-x-auto border rounded">
      <table className="min-w-full bg-white">
        <thead className="text-left bg-gray-50">
          <tr>
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Number</th>
              <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Minibar</th>
            <th className="px-4 py-2">Available</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((r, index) => {
            const rowNumber = currentPage * pageSize + index + 1
            return (
              <tr key={`${r.number}-${index}`} className="border-t">
                <td className="px-4 py-2 text-gray-500">{rowNumber}</td>
                <td className="px-4 py-2">{r.number}</td>
                <td className="px-4 py-2">{r.type}</td>
                <td className="px-4 py-2">{r.hasMinibar ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2">{r.available ? 'Yes' : 'No'}</td>
                <td className="px-4 py-2 text-right space-x-2">
                  <Link to={`/rooms/${r.number}`} className="text-green-600 hover:underline">View</Link>
                  <Link to={`/rooms/${r.number}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                  <button onClick={() => onDelete(r.number)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
