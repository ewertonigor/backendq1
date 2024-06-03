import { prisma } from '../server'
import { UserInterface } from '../interfaces/UserInterface'
import { hash } from 'bcryptjs'

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
}

export { userService }
