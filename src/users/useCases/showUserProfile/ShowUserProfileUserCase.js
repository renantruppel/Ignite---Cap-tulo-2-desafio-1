"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowUserProfileUseCase = void 0;
var ShowUserProfileUseCase = /** @class */ (function () {
    function ShowUserProfileUseCase(userService) {
        this.userService = userService;
    }
    ShowUserProfileUseCase.prototype.execute = function (id) {
        var user = this.userService.findById(id);
        if (!user) {
            throw new Error("Usuário inexistente");
        }
        return user;
    };
    return ShowUserProfileUseCase;
}());
exports.ShowUserProfileUseCase = ShowUserProfileUseCase;
