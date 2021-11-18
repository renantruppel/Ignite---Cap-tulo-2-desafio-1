import { IUserRepository } from "../../repository/implementations/IUserRepository";
import { UserRepository } from '../../repository/implementations/UserRepository'

interface IResponse {
    id: string,
    nome: string,
    email: string, 
    admin: boolean,
    created_at: Date,
    updated_at: Date
}

class TurnUserAdminUseCase {

    constructor(private userService:IUserRepository) {
       
    }

    execute(id: string): IResponse {
        const user = this.userService.turnAdmin(id)
        if(!user) {
            throw new Error
        }
        return user
    }
}

export { TurnUserAdminUseCase }