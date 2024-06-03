import { prisma } from '../server'
import { UserInterface } from '../interfaces/UserInterface'

const userService = {
  createUser: async (
    user: string,
    password: string,
  ): Promise<UserInterface> => {
    const newUser = await prisma.user.create({
      data: {
        user,
        password,
      },
    })

    return newUser
  },
}

export { userService }
