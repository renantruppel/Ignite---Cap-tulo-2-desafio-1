"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UserRepository_1 = require("../../../users/repository/implementations/UserRepository");
var ShowUserProfileUserCase_1 = require("../../../users/useCases/showUserProfile/ShowUserProfileUserCase");
describe("ShowUserProfileUseCase", function () {
    var userRepository;
    var showUserProfileUseCase;
    beforeAll(function () {
        userRepository = UserRepository_1.UserRepository.getInstance();
        showUserProfileUseCase = new ShowUserProfileUserCase_1.ShowUserProfileUseCase(userRepository);
    });
    it("should be able to get user profile by ID", function () {
        var user = userRepository.create("Danilo Vieira", "danilo@rocketseat.com");
        var findUser = showUserProfileUseCase.execute(user.id);
        expect(findUser).toMatchObject(user);
    });
    it("should not be able to show profile of a non existing user", function () {
        expect(function () {
            showUserProfileUseCase.execute((0, uuid_1.v4)());
        }).toThrow();
    });
});
