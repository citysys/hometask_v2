import { create } from 'zustand'
import { userSlice } from './entities/user.slice'
import { UserSlice } from './entities/user.types'

type Store = UserSlice

export const useStore = create<Store>((...slices) => ({
    ...userSlice(...slices),
}))
