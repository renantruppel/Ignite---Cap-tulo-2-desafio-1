"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreationController = void 0;
var indexController_1 = require("./indexController");
var UserCreationController = /** @class */ (function () {
    function UserCreationController() {
        this.createUser = function (req, res) {
            var _a = req.body, nome = _a.nome, email = _a.email;
            try {
                var user = indexController_1.createUserUseCase.execute(nome, email);
                return res.status(201).json({
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    admin: user.admin
                });
            }
            catch (e) {
                return res.status(400).json({ error: e });
            }
        };
        this.becomeAdmin = function (req, res) {
            var user_id = req.params.user_id;
            try {
                var user = indexController_1.turnUserAdminUseCase.execute(user_id);
                return res.status(201).json({
                    nome: user.nome,
                    email: user.email,
                    admin: user.admin
                });
            }
            catch (e) {
                return res.status(404).json({ error: "usuário inexistente" });
            }
        };
        this.getUserById = function (req, res) {
            var user_id = req.params.user_id;
            try {
                var user = indexController_1.showUserProfileUseCase.execute(user_id);
                return res.status(201).json(user);
            }
            catch (e) {
                return res.status(404).json({ error: e });
            }
        };
        this.returnUsersForAdmin = function (req, res) {
            var user_id = req.headers.user_id;
            try {
                var users = indexController_1.listAllUsersUseCase.execute(user_id.toString());
                res.status(201).json(users);
            }
            catch (e) {
                return res.status(400).json({ error: "id não pertence a um admin" });
            }
        };
    }
    return UserCreationController;
}());
exports.UserCreationController = UserCreationController;
