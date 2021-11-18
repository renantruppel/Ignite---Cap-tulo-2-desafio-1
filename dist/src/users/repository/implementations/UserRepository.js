"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
var User_1 = require("../../model/User");
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.users = [];
    }
    UserRepository.getInstance = function () {
        if (!UserRepository.INSTANCE) {
            UserRepository.INSTANCE = new UserRepository();
        }
        return UserRepository.INSTANCE;
    };
    UserRepository.prototype.create = function (nome, email) {
        var hasEmailCreated = this.users.some(function (user) { return user.email === email; });
        if (hasEmailCreated) {
            return null;
        }
        var user = new User_1.User(nome, email);
        this.users.push(user);
        return user;
    };
    UserRepository.prototype.getAllUsers = function () {
        return this.users;
    };
    UserRepository.prototype.turnAdmin = function (id) {
        var user = this.users.find(function (user) { return user.id === id; });
        if (user) {
            user.admin = true;
            return user;
        }
        return null;
    };
    UserRepository.prototype.findById = function (id) {
        var user = this.users.find(function (user) { return user.id === id; });
        if (user) {
            return user;
        }
        return user;
    };
    UserRepository.prototype.findByEmail = function (email) {
        var user = this.users.find(function (user) { return user.email === email; });
        if (user) {
            return user;
        }
        return user;
    };
    UserRepository.prototype.list = function (id) {
        var user = this.users.find(function (user) { return user.id === id; });
        if (user && user.admin === true) {
            return this.users;
        }
        return null;
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
