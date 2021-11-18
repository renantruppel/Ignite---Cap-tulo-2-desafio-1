import { Request, Response  } from "express";
import { createUserUseCase, listAllUsersUseCase, 
    turnUserAdminUseCase, showUserProfileUseCase } from "./indexController";

class UserCreationController {

    constructor() {
    }
 

    createUser = (req: Request, res: Response) => {
        const {nome, email} = req.body
        try {
            const user = createUserUseCase.execute(nome, email) 
            return res.status(201).json({
                id: user.id,
                nome: user.nome,
                email: user.email, 
                admin: user.admin
            })
        }     
        catch(e) {
            
            return res.status(400).json({error: e})
        }   
    }

    becomeAdmin = (req: Request, res: Response) => {
        const { user_id } = req.params
        try {
            const user = turnUserAdminUseCase.execute(user_id)
            return res.status(201).json({
                nome: user.nome,
                email: user.email,
                admin: user.admin})
        }
        catch(e) {
            return res.status(404).json({error: "usuário inexistente"})
        }
        
    }

    getUserById = (req: Request, res: Response) => {
        const { user_id } = req.params
        try {
            const user = showUserProfileUseCase.execute(user_id)
            return res.status(201).json(user)
        }
        catch(e) {
            return res.status(404).json({error: e})
        }    
    }

    returnUsersForAdmin = (req: Request, res: Response) => {
        const { user_id }  = req.headers

        try {
            const users = listAllUsersUseCase.execute(user_id.toString())
            res.status(201).json(users)
        }
        catch(e) {
            return res.status(400).json({error: "id não pertence a um admin"})
        }
    }

}

export { UserCreationController }