import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createRoom } from '../api/rooms'
import RoomForm from '../components/RoomForm'

export default function NewRoomPage() {
  const nav = useNavigate()
  const qc = useQueryClient()
  const mut = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] })
      nav('/')
    }
  })

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Add Room</h1>
      <RoomForm
        defaultValues={{ number: 0, type: 'SINGLE', hasMinibar: false, available: true }}
        onSubmit={(v) => mut.mutate(v as any)}
        submitLabel="Create"
      />
      {mut.isError && <p className="text-red-600">Failed to create room</p>}
    </div>
  )
}
