"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UserRepository_1 = require("../../../users/repository/implementations/UserRepository");
var TurnUserAdminUseCase_1 = require("../../../users/useCases/turnUserAdmin/TurnUserAdminUseCase");
describe("TurnUserAdminUseCase", function () {
    var userRepository;
    var turnUserAdminUseCase;
    beforeAll(function () {
        userRepository = UserRepository_1.UserRepository.getInstance();
        turnUserAdminUseCase = new TurnUserAdminUseCase_1.TurnUserAdminUseCase(userRepository);
    });
    it("should be able to turn an user as admin", function () {
        var name = "Joseph Oliveira";
        var email = "dogim@rocketseat.com";
        var user = userRepository.create(name, email);
        var updatedUser = turnUserAdminUseCase.execute(user.id);
        expect(updatedUser.admin).toBe(true);
        expect(userRepository.list(user.id)).toStrictEqual(expect.arrayContaining([updatedUser]));
    });
    it("should not be able to turn a non existing user as admin", function () {
        expect(function () {
            turnUserAdminUseCase.execute((0, uuid_1.v4)());
        }).toThrow();
    });
});
