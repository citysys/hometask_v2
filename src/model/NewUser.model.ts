import { z } from 'zod'
import { isValidId } from './services/validation.service'

export const NewUserSchema = z.object({
    fullName: z.string().regex(/^[א-ת\s]+$/),
    id: z
        .string()
        .min(9)
        .refine((id) => isValidId(id)),
    birthDate: z.string().min(6),
    phoneNumber: z.string().min(10).startsWith('05'),
    email: z.string().email(),
    city: z.string(),
    street: z.string(),
    houseNumber: z.string().min(1),
})

export type NewUser = z.infer<typeof NewUserSchema>
