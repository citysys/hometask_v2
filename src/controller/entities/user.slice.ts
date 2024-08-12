import { StateCreator } from 'zustand'
import { UserSlice } from './user.types'
import { NewUser } from '../../model'

const defaultUser: NewUser = {
    fullName: '',
    id: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    city: '',
    street: '',
    houseNumber: '',
}

export const userSlice: StateCreator<UserSlice> = (set) => ({
    user: defaultUser,
    setUser: (newUser: NewUser) => set({ user: newUser }),
})
