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

class ListAllUsersUseCase {



    constructor(private userService:IUserRepository) {

    }

    execute(id: string): IResponse[] {
        
        const users = this.userService.list(id)
        if(!users) {
            throw new Error
        }
        return users
    }
    

}

export { ListAllUsersUseCase }