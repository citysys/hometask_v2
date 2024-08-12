import { NewUser } from '../../model'
import { useStore } from '../store'

export const createUser = (data: NewUser) => {
    useStore.getState().setUser(data)
}
