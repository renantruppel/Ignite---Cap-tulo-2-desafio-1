"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRoutes = void 0;
var express_1 = require("express");
var UserCreationController_1 = require("../controller/UserCreationController");
var usersRoutes = (0, express_1.Router)();
exports.usersRoutes = usersRoutes;
var userCreationController = new UserCreationController_1.UserCreationController();
/*usersRoutes.get('/getAllUsers', (req, res) => {
    userCreationController.getAllUsers(req, res)
})*/
usersRoutes.post('/', function (req, res) {
    userCreationController.createUser(req, res);
});
usersRoutes.patch('/:user_id/admin', function (req, res) {
    userCreationController.becomeAdmin(req, res);
});
usersRoutes.get('/:user_id', function (req, res) {
    userCreationController.getUserById(req, res);
});
usersRoutes.get('/', function (req, res) {
    userCreationController.returnUsersForAdmin(req, res);
});
