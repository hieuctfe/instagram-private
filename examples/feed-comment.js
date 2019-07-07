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
    var ig, auth, userFeed, myPostsFirstPage, second, userpostpk, location, temp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                ig = new src_1.IgApiClient();
                ig.state.generateDevice(process.env.IG_USERNAME);
                ig.state.proxyUrl = process.env.IG_PROXY;
                return [4 /*yield*/, ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD)];
            case 1:
                auth = _a.sent();
                userFeed = ig.feed.timeline();
                return [4 /*yield*/, userFeed.items()];
            case 2:
                myPostsFirstPage = _a.sent();
                return [4 /*yield*/, userFeed.items()];
            case 3:
                second = _a.sent();
                userpostpk = second[0].user.pk;
                location = ig.feed.location(userpostpk).request();
                location.then(function (res) {
                    JSON.stringify(res.sections);
                });
                temp = myPostsFirstPage.map(function (el) { return el.id; }).concat(second.map(function (el) { return el.id; }));
                // console.log(myPostsSecondPage[0].image_versions2);
                // temp.forEach(async (el) => {
                try {
                    // let feed_comment = await ig.feed.mediaComments(temp[0]).request()
                    // ig.media.comment({mediaId: feed_comment.comments[0].pk, text:"Ahihi"}).then(res=> {
                    // ig.media.comment()
                    ig.media.comment({ mediaId: myPostsFirstPage[0].pk, text: "Xin chào...." }).then(function (res) {
                        // console.log(JSON.stringify(res))
                    })["catch"](function (er) {
                        console.log(er);
                    });
                    console.log('.................................');
                    // console.log(JSON.stringify(feed_comment));
                }
                catch (e) {
                    console.log(e);
                }
                return [2 /*return*/];
        }
    });
}); })();
