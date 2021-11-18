"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListAllUsersUseCase = void 0;
var ListAllUsersUseCase = /** @class */ (function () {
    function ListAllUsersUseCase(userService) {
        this.userService = userService;
    }
    ListAllUsersUseCase.prototype.execute = function (id) {
        var users = this.userService.list(id);
        if (!users) {
            throw new Error;
        }
        return users;
    };
    return ListAllUsersUseCase;
}());
exports.ListAllUsersUseCase = ListAllUsersUseCase;
