import { Request, Response } from 'express'
import { userService } from '../services/userService'

interface CustomRequest extends Request {
  user?: any
}

export const itemController = {
  addItem: async (req: CustomRequest, res: Response) => {
    const { name } = req.body
    const { userId } = req.user

    try {
      const { newItem } = await userService.addItem(name, userId)

      res.status(201).json({ message: 'Item added successfully', newItem })
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Error to added the item', error: err.message })
    }
  },
  getItemByUser: async (req: CustomRequest, res: Response) => {
    const { userId } = req.user

    try {
      const items = await userService.getItemByUser(userId)

      res.status(201).json(items)
    } catch (err) {
      res.status(500).json({ message: 'Error when searching for user items' })
    }
  },
  updateItem: async (req: CustomRequest, res: Response) => {
    const { currentName, newName } = req.body
    const { userId } = req.user

    try {
      const item = await userService.getItemByName(currentName, userId)
      if (!item) {
        return res.status(404).json({ message: 'Item not found' })
      }

      const updatedItem = await userService.updateItem(item.id, newName)

      res
        .status(201)
        .json({ message: 'Item updated successfully', updatedItem })
    } catch (err) {
      res.status(500).json({ message: 'Error when updating item' })
    }
  },
  deleteItem: async (req: CustomRequest, res: Response) => {
    try {
      const { itemId } = req.body
      const { userId } = req.user

      const deletedItem = await userService.deleteItem(itemId, userId)

      res.status(200).json(deletedItem)
    } catch (err) {
      res.status(500).json({ message: 'Error when deleting item' })
    }
  },
}
