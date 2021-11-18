import { User } from '../../model/User'
import { IUserRepository } from "./IUserRepository";



class UserRepository implements IUserRepository {

    private users: User[];
    //private static INSTANCE: any;
    private static INSTANCE: UserRepository;

    constructor() {
       this.users = [];
    }

    public static getInstance() {
        if(!UserRepository.INSTANCE){
            UserRepository.INSTANCE = new UserRepository() 
        }
        return UserRepository.INSTANCE
    }
    
    create(nome: string, email: string):User {
        const hasEmailCreated = this.users.some(user => user.email === email)
        if(hasEmailCreated) {
            return null
        }
        const user = new User(nome, email)
        this.users.push(user)
        return user 
    }

    getAllUsers():User[] {
        return this.users
    }

    turnAdmin(id: string): User {

        const user = this.users.find(user => user.id === id)

        if(user)
        {
            user.admin = true
            return user
        }
        return null
    }

    findById(id: string): User {
        const user = this.users.find(user => user.id === id)
        if(user) {
            return user
        }
        return user
    }

    findByEmail(email: string): User {
        const user = this.users.find(user => user.email === email)
        if(user) {
            return user
        }
        return user
    }

    list(id: string): User[] {
        const user = this.users.find(user => user.id === id) 
            
        if(user && user.admin === true) {
            return this.users
        }
        return null
    }
}

export { UserRepository }
