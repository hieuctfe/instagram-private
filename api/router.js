"use strict";
exports.__esModule = true;
var following_1 = require("../controller/following");
var account_1 = require("../controller/account");
var transaction_1 = require("../controller/transaction");
module.exports = function (app) {
    app.route('/folowing/autoFollow').get(following_1["default"].auto_follow);
    app.route('/folowing/autoLike').get(following_1["default"].auto_like);
    app.route('/account').get(account_1["default"].get);
    app.route('/account').post(account_1["default"].create);
    app.route('/account')["delete"](account_1["default"]["delete"]);
    app.route('/account').put(account_1["default"].update);
    app.route('/transaction').post(transaction_1["default"].create);
    app.route('/transaction').get(transaction_1["default"].get);
    app.route('/test').get(following_1["default"].test);
};
