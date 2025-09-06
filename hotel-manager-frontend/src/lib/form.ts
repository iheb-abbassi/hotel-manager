import { z } from 'zod'

export const roomSchema = z.object({
  number: z.number().int().min(1, 'Number must be >= 1'),
  type: z.enum(['SINGLE','DOUBLE','SUITE'], { required_error: 'Type is required' }),
  hasMinibar: z.boolean(),
  available: z.boolean()
})
export type RoomFormValues = z.infer<typeof roomSchema>
