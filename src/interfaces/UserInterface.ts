import { ItemInterface } from './ItemInterface'

export interface UserInterface {
  id?: string
  user: string
  password: string
  items?: ItemInterface[]
}
