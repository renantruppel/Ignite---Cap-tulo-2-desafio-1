"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var User_1 = require("../../../users/model/User");
describe("User model", function () {
    it("should be able to create an user with all props", function () {
        var nome = "Atlas";
        var email = "atlas@fromspace.com";
        var user = new User_1.User(nome, email);
        Object.assign(user, {
            created_at: new Date(),
            updated_at: new Date(),
        });
        expect(user).toMatchObject({
            nome: "Atlas",
            email: "atlas@fromspace.com",
            admin: false,
        });
        expect((0, uuid_1.validate)(user.id)).toBe(true);
        expect(user.created_at).toBeInstanceOf(Date);
        expect(user.updated_at).toBeInstanceOf(Date);
    });
});
