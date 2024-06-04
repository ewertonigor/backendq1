import { Request, Response } from 'express'
import { userService } from '../services/userService'
import jwt from 'jsonwebtoken'

export const authenticateController = {
  authenticate: async (req: Request, res: Response) => {
    const { user, password } = req.body
    try {
      const { userExist } = await userService.authenticatedUser(user, password)

      const token = jwt.sign(
        { userId: userExist.id },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: '1h',
        },
      )

      res.status(200).json({ token })
    } catch (err) {
      res.status(401).json({ message: err.message })
    }
  },
}
