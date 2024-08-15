import * as yup from 'yup'

import { inputFields } from '../view/constants/input.const'
import { isValidId } from './services/validation.service'

export interface FormValues extends yup.InferType<typeof NewUserSchema> {
    [key: string]: any;
    fullName: string
    id: string
    birthDate: Date
    phoneNumber: string
    email: string
    city: string
    street: string
    houseNumber: number
    agreeEmail: boolean
    agreeTerms: boolean
}


export const NewUserSchema = yup.object({
    fullName: yup.string().defined('נא להזין שם מלא').matches(/^[א-ת\s]+$/, 'שם לא תקין'),
    id: yup.string().defined()
        .min(9, 'נא להזין מספר ת.ז. בעל 9 ספרות')
        .test('is-valid-id', 'נא להזין מספר ת.ז. תקין ', (value) => isValidId(value)),
    email: yup.string().nullable().email().defined('נא להזין כתובת אימייל'),
    birthDate: yup.date().defined('נא להזין תאריך לידה'),
    phoneNumber: yup.string().defined('נא להזין מספר טלפון')
    .min(10, 'נא להזין מספר טלפון תקין')
    .matches(/^05/, 'נא להזין מספר טלפון תקין'),
    city: yup.string().required('נא להזין עיר'),
    street: yup.string().required('נא להזין רחוב'),
    houseNumber: yup.number().defined('נא להזין מספר בית'),
    agreeTerms: yup.boolean()
    .oneOf([true], 'חובה לאשר את תנאי השימוש')
    .required('חובה לאשר את תנאי השימוש')
});
