"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
exports.__esModule = true;
var login_1 = require("../helper/login");
var Model = require('../models');
exports["default"] = {
    auto_follow: function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var username, number, random_account_list, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = request.body.username;
                    number = request.body.number;
                    random_account_list = [];
                    return [4 /*yield*/, Model.User.findAll()];
                case 1:
                    result = _a.sent();
                    if (number && number > result.length) {
                        response.json({
                            status: false,
                            message: 'Số lượng account không đủ'
                        });
                    }
                    else {
                        while (random_account_list.length < number) {
                            random_account_list.push(result[Math.floor(Math.random() * result.length)]);
                        }
                        Promise.all(random_account_list.map(function (userInfo, idx) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (rs, rj) {
                                        setTimeout(function () {
                                            return __awaiter(this, void 0, void 0, function () {
                                                var loginInfo, ig, userId, user, e_1;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            _a.trys.push([0, 5, , 6]);
                                                            return [4 /*yield*/, login_1["default"](userInfo)];
                                                        case 1:
                                                            loginInfo = _a.sent();
                                                            ig = loginInfo.ig;
                                                            return [4 /*yield*/, ig.user.getIdByUsername(username)];
                                                        case 2:
                                                            userId = _a.sent();
                                                            return [4 /*yield*/, ig.user.info(userId)];
                                                        case 3:
                                                            user = _a.sent();
                                                            return [4 /*yield*/, ig.entity.profile(user.pk).checkFollow()];
                                                        case 4:
                                                            _a.sent();
                                                            console.log('xong: ' + userInfo.username);
                                                            rs();
                                                            return [3 /*break*/, 6];
                                                        case 5:
                                                            e_1 = _a.sent();
                                                            console.log('lỗi: ' + userInfo.username);
                                                            rs();
                                                            return [3 /*break*/, 6];
                                                        case 6: return [2 /*return*/];
                                                    }
                                                });
                                            });
                                        }, idx * 5000);
                                    })];
                            });
                        }); })).then(function (res) {
                            console.log('xong hết');
                        });
                        response.json({
                            status: true,
                            message: 'Đã thực hiện lệnh'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    auto_like: function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var username, number, random_account_list, result;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    username = 'hieuctfe';
                    number = 1;
                    random_account_list = [];
                    return [4 /*yield*/, Model.User.findAll()];
                case 1:
                    result = _a.sent();
                    if (number && number > result.length) {
                        response.json({
                            status: false,
                            message: 'Số lượng account không đủ'
                        });
                    }
                    else {
                        while (random_account_list.length < number) {
                            random_account_list.push(result[Math.floor(Math.random() * result.length)]);
                        }
                        Promise.all(random_account_list.map(function (userInfo, idx) { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (rs, rj) {
                                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                            var loginInfo, ig, userId, user, postList, firstPost, e_2;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        _a.trys.push([0, 7, , 8]);
                                                        return [4 /*yield*/, login_1["default"](userInfo)];
                                                    case 1:
                                                        loginInfo = _a.sent();
                                                        ig = loginInfo.ig;
                                                        return [4 /*yield*/, ig.user.getIdByUsername(username)];
                                                    case 2:
                                                        userId = _a.sent();
                                                        return [4 /*yield*/, ig.user.info(userId)];
                                                    case 3:
                                                        user = _a.sent();
                                                        return [4 /*yield*/, ig.feed.user(user.pk).request()];
                                                    case 4:
                                                        postList = _a.sent();
                                                        firstPost = postList.items[0];
                                                        if (!firstPost.pk) return [3 /*break*/, 6];
                                                        return [4 /*yield*/, ig.media.like({
                                                                mediaId: firstPost.pk,
                                                                moduleInfo: {
                                                                    module_name: 'profile',
                                                                    user_id: loginInfo.auth.pk,
                                                                    username: loginInfo.auth.username
                                                                },
                                                                d: 0
                                                            })];
                                                    case 5:
                                                        _a.sent();
                                                        _a.label = 6;
                                                    case 6:
                                                        console.log('xong: ' + userInfo.username);
                                                        rs();
                                                        return [3 /*break*/, 8];
                                                    case 7:
                                                        e_2 = _a.sent();
                                                        console.log('lỗi: ' + userInfo.username);
                                                        rs();
                                                        return [3 /*break*/, 8];
                                                    case 8: return [2 /*return*/];
                                                }
                                            });
                                        }); }, idx * 5000);
                                    })];
                            });
                        }); })).then(function (res) {
                            console.log('xong hết');
                        });
                        response.json({
                            status: true,
                            message: 'Đã thực hiện lệnh'
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); },
    test: function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // await Model.User.create({
                //     username: 'Adalia.workshop',
                //     password: '25161114',
                //     proxy: 'http://lephuong1199539:88sxWuuoJip0@45.63.4.66:25346'
                // })
                //
                // await Model.Transaction.create({
                //     customerUserName: 'Hieu Cao',
                //     packageId: '1',
                //     phone: "0839365555",
                //     note: "Here is note",
                // })
                // await Model.TransactionDetail.create({
                //     userId: '1',
                //     transactionId: '1',
                //     isFollowing: true,
                //     postLiked: "1234",
                // })
                Model.TransactionDetail.findAll().then(function (res) {
                    try {
                        res[0].getTransaction().then(function (res1) {
                            response.json(res1);
                        });
                    }
                    catch (e) {
                        response.json({ status: false });
                    }
                });
                return [2 /*return*/];
            });
        });
    }
};
