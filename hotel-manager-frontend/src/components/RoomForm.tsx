import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { roomSchema, type RoomFormValues } from '../lib/form'
import type { RoomDTO } from '../types'

export default function RoomForm({defaultValues, onSubmit, submitLabel='Save'}: {
  defaultValues: RoomDTO
  onSubmit: (values: RoomFormValues) => void
  submitLabel?: string
}) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RoomFormValues>({
    defaultValues,
    resolver: zodResolver(roomSchema)
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium">Number</label>
        <input type="number" {...register('number', { valueAsNumber: true })} className="mt-1 w-full border rounded px-3 py-2"/>
        {errors.number && <p className="text-sm text-red-600 mt-1">{errors.number.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Type</label>
        <select {...register('type')} className="mt-1 w-full border rounded px-3 py-2">
          <option value="SINGLE">SINGLE</option>
          <option value="DOUBLE">DOUBLE</option>
          <option value="SUITE">SUITE</option>
        </select>
        {errors.type && <p className="text-sm text-red-600 mt-1">{errors.type.message}</p>}
      </div>
      <div className="flex items-center gap-2">
        <input id="minibar" type="checkbox" {...register('hasMinibar')} />
        <label htmlFor="minibar">Has minibar</label>
      </div>
      <div className="flex items-center gap-2">
        <input id="available" type="checkbox" {...register('available')} />
        <label htmlFor="available">Available</label>
      </div>
      <button disabled={isSubmitting} className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 disabled:opacity-50">{submitLabel}</button>
    </form>
  )
}
