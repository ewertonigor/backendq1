import express from 'express'
import { userController } from './controllers/userController'

export const routes = express.Router()

routes.post('/register', userController.create)
