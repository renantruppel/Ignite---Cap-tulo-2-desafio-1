import express from 'express'
import { usersRoutes } from './users/routes/users.routes'

const app = express()

app.use(express.json())

app.use('/users', usersRoutes)

//app.listen(3000)
export { app }