"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var uuid_1 = require("uuid");
var User = /** @class */ (function () {
    function User(nome, email) {
        this.id = (0, uuid_1.v4)();
        this.nome = nome;
        this.email = email;
        this.admin = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return User;
}());
exports.User = User;
