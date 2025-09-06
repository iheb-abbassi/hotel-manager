import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getRoom, updateRoom } from '../api/rooms'
import RoomForm from '../components/RoomForm'

export default function EditRoomPage() {
  const { number } = useParams<{number: string}>()
  const nav = useNavigate()
  const qc = useQueryClient()

  const query = useQuery({
    queryKey: ['room', number],
    queryFn: () => getRoom(Number(number))
  })

  const mut = useMutation({
    mutationFn: (payload: any) => updateRoom(Number(number), payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] })
      nav('/')
    }
  })

  if (query.isLoading) return <p>Loading...</p>
  if (query.isError || !query.data) return <p className="text-red-600">Failed to load room</p>

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Edit Room {number}</h1>
      <RoomForm
        defaultValues={query.data}
        onSubmit={(v) => mut.mutate(v as any)}
        submitLabel="Save"
      />
      {mut.isError && <p className="text-red-600">Failed to update room</p>}
    </div>
  )
}
