import { NewUser } from '../../model'

export interface UserSlice {
    user: NewUser
    setUser: (newUser: NewUser) => void
}
