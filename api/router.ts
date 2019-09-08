import followingCtrl from '../controller/following';
import accountCtrl from '../controller/account';
import transactionCtrl from '../controller/transaction';

module.exports = function(app) {
  app.route('/folowing/autoFollow').get(followingCtrl.auto_follow);
  app.route('/folowing/autoLike').get(followingCtrl.auto_like);
  app.route('/account').get(accountCtrl.get);
  app.route('/account').post(accountCtrl.create);
  app.route('/account').delete(accountCtrl.delete);
  app.route('/account').put(accountCtrl.update);
  app.route('/transaction').post(transactionCtrl.create);
  app.route('/transaction').get(transactionCtrl.get);
  app.route('/test').get(followingCtrl.test);
};
