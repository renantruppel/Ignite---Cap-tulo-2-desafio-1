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

class ShowUserProfileUseCase {

    constructor(private userService:IUserRepository) {
    }

    execute(id: string): IResponse {
        const user = this.userService.findById(id)

        if(!user) {
            throw new Error("Usuário inexistente")
        }

        return user
    }
}

export { ShowUserProfileUseCase }