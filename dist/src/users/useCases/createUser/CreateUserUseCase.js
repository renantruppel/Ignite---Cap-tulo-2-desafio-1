"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserUseCase = void 0;
var CreateUserUseCase = /** @class */ (function () {
    function CreateUserUseCase(userService) {
        this.userService = userService;
    }
    CreateUserUseCase.prototype.execute = function (nome, email) {
        var user = this.userService.create(nome, email);
        if (!user) {
            throw new Error("email já está cadastrado");
        }
        return user;
    };
    return CreateUserUseCase;
}());
exports.CreateUserUseCase = CreateUserUseCase;
