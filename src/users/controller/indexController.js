"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showUserProfileUseCase = exports.turnUserAdminUseCase = exports.listAllUsersUseCase = exports.createUserUseCase = void 0;
var UserRepository_1 = require("../repository/implementations/UserRepository");
var CreateUserUseCase_1 = require("../useCases/createUser/CreateUserUseCase");
var ListAllUsersUseCase_1 = require("../useCases/listAllUsers/ListAllUsersUseCase");
var TurnUserAdminUseCase_1 = require("../useCases/turnUserAdmin/TurnUserAdminUseCase");
var ShowUserProfileUserCase_1 = require("../useCases/showUserProfile/ShowUserProfileUserCase");
//const userService = UserService.getInstance()
var createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(UserRepository_1.UserRepository.getInstance());
exports.createUserUseCase = createUserUseCase;
var listAllUsersUseCase = new ListAllUsersUseCase_1.ListAllUsersUseCase(UserRepository_1.UserRepository.getInstance());
exports.listAllUsersUseCase = listAllUsersUseCase;
var turnUserAdminUseCase = new TurnUserAdminUseCase_1.TurnUserAdminUseCase(UserRepository_1.UserRepository.getInstance());
exports.turnUserAdminUseCase = turnUserAdminUseCase;
var showUserProfileUseCase = new ShowUserProfileUserCase_1.ShowUserProfileUseCase(UserRepository_1.UserRepository.getInstance());
exports.showUserProfileUseCase = showUserProfileUseCase;
