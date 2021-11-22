"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var uuid_1 = require("uuid");
var index_1 = require("../index");
var UserRepository_1 = require("../users/repository/implementations/UserRepository");
describe("[POST] /users", function () {
    it("should be able to create new users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .post("/users")
                        .send({
                        nome: "John Doe",
                        email: "john.doe@example.com",
                    })
                        .expect(201)];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchObject({
                        nome: "John Doe",
                        email: "john.doe@example.com",
                        admin: false,
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create new users when email is already taken", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .post("/users")
                        .send({
                        nome: "John Doe",
                        email: "john.doe@example.com",
                    })
                        .expect(400)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[PATCH] /users/:user_id/admin", function () {
    it("should be able to turn an user as admin", function () { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepository, nome, email, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRepository = UserRepository_1.UserRepository.getInstance();
                    nome = String(Math.random());
                    email = String(Math.random());
                    user = usersRepository.create(nome, email);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).patch("/users/" + user.id + "/admin")];
                case 1:
                    response = _a.sent();
                    expect(response.body).toMatchObject({
                        nome: user.nome,
                        email: user.email,
                    });
                    expect(response.body.admin).toBe(true);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to turn a non existing user as admin", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .patch("/users/" + (0, uuid_1.v4)() + "/admin")
                        .expect(404)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[GET] /users/:user_id", function () {
    it("should be able to get user profile by ID", function () { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepository, nome, email, user, response, parsedResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRepository = UserRepository_1.UserRepository.getInstance();
                    nome = String(Math.random());
                    email = String(Math.random());
                    user = usersRepository.create(nome, email);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/users/" + user.id)];
                case 1:
                    response = _a.sent();
                    parsedResponse = __assign(__assign({}, response.body), { created_at: new Date(response.body.created_at), updated_at: new Date(response.body.updated_at) });
                    expect(parsedResponse).toMatchObject(__assign(__assign({}, user), { created_at: user.created_at, updated_at: user.updated_at }));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to show profile of a non existing user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/users/" + (0, uuid_1.v4)()).expect(404)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("[GET] /users", function () {
    it("should be able to list all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepository, nome, email, user1, nome2, email2, user2, nome3, email3, user3, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRepository = UserRepository_1.UserRepository.getInstance();
                    nome = String(Math.random());
                    email = String(Math.random());
                    user1 = usersRepository.create(nome, email);
                    usersRepository.turnAdmin(user1.id);
                    nome2 = String(Math.random());
                    email2 = String(Math.random());
                    user2 = usersRepository.create(nome2, email2);
                    nome3 = String(Math.random());
                    email3 = String(Math.random());
                    user3 = usersRepository.create(nome3, email3);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app).get("/users").set("user_id", user1.id)];
                case 1:
                    response = _a.sent();
                    expect(response.body.map(function (res) { return (__assign(__assign({}, res), { created_at: new Date(res.created_at), updated_at: new Date(res.updated_at) })); })).toEqual(expect.arrayContaining([
                        expect.objectContaining(__assign(__assign({}, user1), { admin: true })),
                        user2,
                        user3,
                    ]));
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to a non admin user get list of all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepository, nome, email, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRepository = UserRepository_1.UserRepository.getInstance();
                    nome = String(Math.random());
                    email = String(Math.random());
                    user = usersRepository.create(nome, email);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .get("/users")
                            .set("user_id", user.id)
                            .expect(400)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to a non admin user get list of all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepository, nome, email, user, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usersRepository = UserRepository_1.UserRepository.getInstance();
                    nome = String(Math.random());
                    email = String(Math.random());
                    user = usersRepository.create(nome, email);
                    return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                            .get("/users")
                            .set("user_id", user.id)
                            .expect(400)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to a non existing user get list of all users", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(index_1.app)
                        .get("/users")
                        .set("user_id", (0, uuid_1.v4)())
                        .expect(400)];
                case 1:
                    response = _a.sent();
                    expect(response.body.error).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
});
