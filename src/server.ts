import { PrismaClient } from '@prisma/client'
import express from 'express'

const app = express()
app.use(express.json())

export const prisma = new PrismaClient()
app.listen(3000, () => {
  try {
    console.log('Server is running')
  } catch (err) {
    console.log(`ERROR - SERVER IS NOT RUNNING ${err}`)
  }
})
