import { UserRepository } from '../repository/implementations/UserRepository'
import { CreateUserUseCase } from '../useCases/createUser/CreateUserUseCase'
import { ListAllUsersUseCase } from '../useCases/listAllUsers/ListAllUsersUseCase'
import { TurnUserAdminUseCase } from '../useCases/turnUserAdmin/TurnUserAdminUseCase'
import { ShowUserProfileUseCase } from '../useCases/showUserProfile/ShowUserProfileUserCase'    
    

//const userService = UserService.getInstance()

const createUserUseCase = new CreateUserUseCase(UserRepository.getInstance())
const listAllUsersUseCase = new ListAllUsersUseCase(UserRepository.getInstance())
const turnUserAdminUseCase = new TurnUserAdminUseCase(UserRepository.getInstance())
const showUserProfileUseCase = new ShowUserProfileUseCase(UserRepository.getInstance())

export { createUserUseCase, listAllUsersUseCase, 
    turnUserAdminUseCase, showUserProfileUseCase}