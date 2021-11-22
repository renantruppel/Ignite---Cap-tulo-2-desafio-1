"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserRepository_1 = require("../../../users/repository/implementations/UserRepository");
var CreateUserUseCase_1 = require("../../../users/useCases/createUser/CreateUserUseCase");
describe("CreateUserUseCase", function () {
    var userRepository;
    var createUserUseCase;
    beforeAll(function () {
        userRepository = UserRepository_1.UserRepository.getInstance();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userRepository);
    });
    it("should be able to create new users", function () {
        var nome = "Danilo Vieira";
        var email = "danilo@rocketseat.com";
        var user = createUserUseCase.execute(nome, email);
        userRepository.turnAdmin(user.id);
        expect(userRepository.list(user.id)).toStrictEqual([user]);
    });
    it("should not be able to create new users when email is already taken", function () {
        console.log(userRepository.getAllUsers());
        expect(function () {
            createUserUseCase.execute("Danilo Vieira", "danilo@rocketseat.com");
        }).toThrow();
    });
});
