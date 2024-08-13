import { z } from 'zod';
import { isValidId } from './services/validation.service';

export const NewUserSchema = z.object({
    fullName: z.string()
        .min(1, "שם מלא נדרש")
        .regex(/^[א-ת\s]+$/, "שם מלא יכול להכיל רק תווים בעברית ורווחים"),
    id: z.string()
        .length(9, "ת.ז חייבת להיות באורך 9 תווים")
        .refine((id) => isValidId(id), "ת.ז אינה תקינה"),
    birthDate: z.string()
        .min(6, "תאריך לידה נדרש"),
    phoneNumber: z.string()
        .length(10, "מספר טלפון חייב להיות באורך 10 תווים")
        .startsWith('05', "מספר טלפון חייב להתחיל ב-05"),
    email: z.string()
        .email("כתובת מייל לא תקינה"),
    city: z.string()
        .min(1, "עיר נדרשת"),
    street: z.string()
        .min(1, "רחוב נדרש"),
    houseNumber: z.string()
        .min(1, "מספר בית נדרש"),
});

export type NewUser = z.infer<typeof NewUserSchema>;
