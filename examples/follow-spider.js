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
require("dotenv/config");
var src_1 = require("../src");
(function () { return __awaiter(_this, void 0, void 0, function () {
    var ig, users, auth, followersFeed, items, _loop_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ig = new src_1.IgApiClient();
                ig.state.generateDevice(process.env.IG_USERNAME);
                ig.state.proxyUrl = process.env.IG_PROXY;
                users = [];
                return [4 /*yield*/, ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)];
            case 1:
                auth = _a.sent();
                followersFeed = ig.feed.accountFollowers(auth.pk);
                return [4 /*yield*/, followersFeed.items()];
            case 2:
                items = _a.sent();
                users = items;
                console.log(users.length);
                _loop_1 = function () {
                    var amount, temp_users;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log('bắt đầu quét: ' + users[0].username);
                                amount = 1000 - users.length;
                                return [4 /*yield*/, ig.feed.accountFollowers(users[0].pk).items()];
                            case 1:
                                temp_users = _a.sent();
                                // let id = await ig.user.getIdByUsername(temp_users[0].username)
                                // let info = await ig.friendship.show(id)
                                // if (!info.following  || !info.incoming_request) {
                                if (temp_users.length <= amount) {
                                    users = users.concat(temp_users);
                                }
                                return [4 /*yield*/, new Promise(function (rs, rj) {
                                        var _this = this;
                                        Promise.all(temp_users.map(function (el, idx) { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                return [2 /*return*/, new Promise(function (rs, rj) {
                                                        setTimeout(function () {
                                                            return __awaiter(this, void 0, void 0, function () {
                                                                var id, info, res, e_1;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            _a.trys.push([0, 5, , 6]);
                                                                            return [4 /*yield*/, ig.user.getIdByUsername(el.username + '')];
                                                                        case 1:
                                                                            id = _a.sent();
                                                                            return [4 /*yield*/, ig.friendship.show(id)
                                                                                // console.log(JSON.stringify(info));
                                                                                // console.log("*******************************")
                                                                            ];
                                                                        case 2:
                                                                            info = _a.sent();
                                                                            if (!(!info.following || !info.incoming_request)) return [3 /*break*/, 4];
                                                                            return [4 /*yield*/, el.checkFollow()];
                                                                        case 3:
                                                                            res = _a.sent();
                                                                            console.log('giây thứ: ' + idx + ' : ' + el.username + ' : following:' + res.status + ' - status: ' + res.status);
                                                                            _a.label = 4;
                                                                        case 4:
                                                                            rs();
                                                                            return [3 /*break*/, 6];
                                                                        case 5:
                                                                            e_1 = _a.sent();
                                                                            console.log(e_1);
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
                                            console.log('xong user: ' + users[0].username);
                                            rs();
                                        });
                                    })
                                    // }
                                ];
                            case 2:
                                _a.sent();
                                // }
                                users.shift();
                                return [2 /*return*/];
                        }
                    });
                };
                _a.label = 3;
            case 3:
                if (!(users.length <= 100000 && users.length > 0)) return [3 /*break*/, 5];
                return [5 /*yield**/, _loop_1()];
            case 4:
                _a.sent();
                return [3 /*break*/, 3];
            case 5: return [2 /*return*/];
        }
    });
}); })();
