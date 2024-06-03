import { Request, Response } from 'express'
import { userService } from '../services/userService'

export const userController = {
  create: (req: Request, res: Response) => {
    const { user, password } = req.body
    const newUser = userService.createUser(user, password)

    if (!newUser) {
      return res.status(404).json({ message: 'Erro in user create failed' })
    }

    return res.status(201).json({ message: 'Sucessful created user!' })
  },
}
