"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var UserRepository_1 = require("../../../users/repository/implementations/UserRepository");
describe("UsersRepository", function () {
    var userRepository;
    beforeAll(function () {
        userRepository = UserRepository_1.UserRepository.getInstance();
    });
    it("should be able to create new users", function () {
        var nome = "Vinicius Fraga";
        var email = "vinifraga@rocketseat.com";
        var user = userRepository.create(nome, email);
        expect(user).toMatchObject({
            nome: "Vinicius Fraga",
            email: "vinifraga@rocketseat.com",
            admin: false,
        });
        expect((0, uuid_1.validate)(user.id)).toBe(true);
        expect(user.created_at).toBeInstanceOf(Date);
        expect(user.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to list all users", function () {
        var nome = "Danilo Vieira";
        var email = "danilo@rocketseat.com";
        var user = userRepository.create(nome, email);
        userRepository.turnAdmin(user.id);
        var users = userRepository.list(user.id);
        expect(users).toStrictEqual(expect.arrayContaining([user]));
    });
    it("should be able to find user by ID", function () {
        var nome = "Vinicius Fraga";
        var email = "vinifraga2@rocketseat.com";
        var user = userRepository.create(nome, email);
        var findUser = userRepository.findById(user.id);
        expect(findUser).toMatchObject({
            nome: user.nome,
            email: user.email,
            admin: false,
        });
        expect((0, uuid_1.validate)(findUser.id)).toBe(true);
        expect(findUser.created_at).toBeInstanceOf(Date);
        expect(findUser.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to find user by e-mail address", function () {
        /*const nome = "Vinicius Fraga"
        const email = "vinifraga@rocketseat.com"
        const user = userService.create(nome, email);*/
        var findUser = userRepository.findByEmail("vinifraga@rocketseat.com");
        expect(findUser).toMatchObject({
            nome: findUser.nome,
            email: findUser.email,
            admin: false,
        });
        expect((0, uuid_1.validate)(findUser.id)).toBe(true);
        expect(findUser.created_at).toBeInstanceOf(Date);
        expect(findUser.updated_at).toBeInstanceOf(Date);
    });
    it("should be able to turn an user as admin", function () {
        var nome = "Vinicius Fraga";
        var email = "vinifraga3@rocketseat.com";
        var user = userRepository.create(nome, email);
        var admin = userRepository.turnAdmin(user.id);
        expect(admin).toMatchObject({
            nome: user.nome,
            email: user.email,
            admin: true,
        });
        expect((0, uuid_1.validate)(admin.id)).toBe(true);
        expect(admin.created_at).toBeInstanceOf(Date);
        expect(admin.updated_at).toBeInstanceOf(Date);
    });
});
