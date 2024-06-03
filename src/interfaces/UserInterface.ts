import { ItemInterface } from './ItemInterface'

export interface UserInterface {
  id?: string
  user: string
  password_hash: string
  items?: ItemInterface[]
}
