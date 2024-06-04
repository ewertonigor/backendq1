import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

interface CustomRequest extends Request {
  user?: any
}

export const loginRequired = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'Login Required' })
  }

  const [, token] = authorization.split(' ')

  if (!token) {
    return res.status(401).json({ message: 'Login Required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
    req.user = decoded
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' })
  }
}
