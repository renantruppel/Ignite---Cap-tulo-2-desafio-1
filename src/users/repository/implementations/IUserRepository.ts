import { User } from '../../model/User'

interface IUserRepository {
    create(nome: string, email: string): User
    getAllUsers(): User[]
    turnAdmin(id: string): User
    findById(id: string): User
    list(id: string): User[]
    findByEmail(email: string): User
}

export { IUserRepository }