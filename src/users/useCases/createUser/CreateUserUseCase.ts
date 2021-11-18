import { IUserRepository } from "../../repository/implementations/IUserRepository";
import { UserRepository } from '../../repository/implementations/UserRepository'


interface IResponse {
    id: string,
    nome: string,
    email: string, 
    admin: boolean
}

class CreateUserUseCase {

    constructor(private userService:IUserRepository) {

    }

    execute(nome: string, email: string): IResponse {

        const user = this.userService.create(nome, email)
        if(!user) {
            throw new Error("email já está cadastrado")       
        }
       
        return user
    }

}

export { CreateUserUseCase }