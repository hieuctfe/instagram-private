import followingCtrl from '../controller/following'

module.exports = function (app) {
    app.route('/').get(followingCtrl.auto_follow)
    app.route('/test').get(followingCtrl.test)
};
