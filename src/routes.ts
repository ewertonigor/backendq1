import express from 'express'
import { userController } from './controllers/userController'
import { authenticateController } from './controllers/authenticateController'
import { itemController } from './controllers/itemController'
import { loginRequired } from './middleware/loginRequired'

export const routes = express.Router()

routes.post('/register', userController.create)
routes.post('/authenticate', authenticateController.authenticate)

// Rota de item
routes.post('/item', loginRequired, itemController.addItem)
routes.get('/item', loginRequired, itemController.getItemByUser)
routes.put('/item', loginRequired, itemController.updateItem)
routes.delete('/item', loginRequired, itemController.deleteItem)
