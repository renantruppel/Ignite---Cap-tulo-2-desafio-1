"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnUserAdminUseCase = void 0;
var TurnUserAdminUseCase = /** @class */ (function () {
    function TurnUserAdminUseCase(userService) {
        this.userService = userService;
    }
    TurnUserAdminUseCase.prototype.execute = function (id) {
        var user = this.userService.turnAdmin(id);
        if (!user) {
            throw new Error;
        }
        return user;
    };
    return TurnUserAdminUseCase;
}());
exports.TurnUserAdminUseCase = TurnUserAdminUseCase;
