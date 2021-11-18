import { Router } from 'express'
import { UserCreationController } from '../controller/UserCreationController'

const usersRoutes = Router()

const userCreationController = new UserCreationController()

/*usersRoutes.get('/getAllUsers', (req, res) => {
    userCreationController.getAllUsers(req, res)
})*/

usersRoutes.post('/', (req, res) => {
    userCreationController.createUser(req, res)
})

usersRoutes.patch('/:user_id/admin', (req, res) => {
    userCreationController.becomeAdmin(req, res)
})

usersRoutes.get('/:user_id', (req, res) => {
    userCreationController.getUserById(req, res)
})

usersRoutes.get('/', (req, res) => {
    userCreationController.returnUsersForAdmin(req, res)
})

export {usersRoutes}