"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UserRepository_1 = require("../../../users/repository/implementations/UserRepository");
var ListAllUsersUseCase_1 = require("../../../users/useCases/listAllUsers/ListAllUsersUseCase");
describe("ListAllUsersUseCase", function () {
    var userRepository;
    var listAllUsersUseCase;
    var userId;
    beforeAll(function () {
        userRepository = UserRepository_1.UserRepository.getInstance();
        listAllUsersUseCase = new ListAllUsersUseCase_1.ListAllUsersUseCase(userRepository);
    });
    it("should be able to list all users", function () {
        var user1 = userRepository.create("Danilo Vieira", "danilo@rocketseat.com");
        var user2 = userRepository.create("Vinicius Fraga", "vinifraga@rocketseat.com");
        userId = user2.id;
        var user3 = userRepository.create("Joseph Oliveira", "dogim@rocketseat.com");
        userRepository.turnAdmin(user1.id);
        var users = listAllUsersUseCase.execute(user1.id);
        expect(users).toEqual(expect.arrayContaining([
            /*expect.objectContaining({
              name: "Danilo Vieira",
              email: "danilo@rocketseat.com",
            })*/ user1,
            user2,
            user3,
        ]));
    });
    it("should not be able to a non admin user get list of all users", function () {
        expect(function () {
            listAllUsersUseCase.execute(userId);
        }).toThrow();
    });
    it("should not be able to a non existing user get list of all users", function () {
        expect(function () {
            listAllUsersUseCase.execute((0, uuid_1.v4)());
        }).toThrow();
    });
});
