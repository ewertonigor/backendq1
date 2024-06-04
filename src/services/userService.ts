import { prisma } from '../server'
import { UserInterface } from '../interfaces/UserInterface'
import { hash, compare } from 'bcryptjs'

const userService = {
  createUser: async (
    user: string,
    password: string,
  ): Promise<UserInterface> => {
    const password_hash = await hash(password, 6)
    const newUser = await prisma.user.create({
      data: {
        user,
        password_hash,
      },
    })

    return newUser
  },
  authenticatedUser: async (user: string, password: string) => {
    const userExist = await prisma.user.findUnique({
      where: {
        user,
      },
    })

    if (!userExist) {
      throw new Error(`Invalid Credentils Error`)
    }

    const doesPasswordMatches = await compare(password, userExist.password_hash)

    if (!doesPasswordMatches) {
      throw new Error('Invalid Credentils Error')
    }

    return {
      userExist,
    }
  },
  addItem: async (name: string, userId: string) => {
    const newItem = await prisma.item.create({
      data: {
        name,
        userId,
      },
    })

    return { newItem }
  },
  getItemByUser: async (userId: string) => {
    try {
      const items = await prisma.item.findMany({
        where: {
          userId,
        },
      })

      return { items }
    } catch (err) {
      throw new Error('Error when searching for user items')
    }
  },
  getItemByName: async (itemName: string, userId: string) => {
    try {
      const items = await prisma.item.findFirst({
        where: {
          name: itemName,
          userId,
        },
      })

      return items || null
    } catch (err) {
      throw new Error('Error when searching for user items')
    }
  },
  updateItem: async (itemId: string, newName: string) => {
    try {
      const updatedItem = await prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          name: newName,
        },
      })

      return updatedItem
    } catch (err) {
      throw new Error('Error when updating item')
    }
  },
  deleteItem: async (itemId: string, userId: string) => {
    try {
      const deletedItem = await prisma.item.delete({
        where: {
          id: itemId,
          userId,
        },
      })

      return deletedItem
    } catch (err) {
      throw new Error('Error when deleting item')
    }
  },
}

export { userService }
