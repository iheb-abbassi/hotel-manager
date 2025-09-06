import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getRoom } from '../api/rooms'

export default function ViewRoomPage() {
  const { number } = useParams<{ number: string }>()
  
  const query = useQuery({
    queryKey: ['room', number],
    queryFn: () => getRoom(Number(number)),
    enabled: !!number
  })

  if (query.isLoading) return <p>Loading...</p>
  if (query.isError) return <p className="text-red-600">Failed to load room</p>
  if (!query.data) return <p>Room not found</p>

  const room = query.data

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">Room {room.number}</h1>
        <Link 
          to={`/rooms/${room.number}/edit`}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 text-sm"
        >
          Edit Room
        </Link>
      </div>

      <div className="bg-white border rounded-lg p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Room Number</label>
            <p className="mt-1 text-lg">{room.number}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <p className="mt-1 text-lg">{room.type}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Minibar</label>
            <p className="mt-1 text-lg">{room.hasMinibar ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Available</label>
            <p className="mt-1 text-lg">
              <span className={`px-2 py-1 rounded-full text-sm ${
                room.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {room.available ? 'Available' : 'Occupied'}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Link 
          to="/"
          className="bg-gray-500 hover:bg-gray-600 text-white rounded px-4 py-2"
        >
          Back to Rooms
        </Link>
      </div>
    </div>
  )
}
