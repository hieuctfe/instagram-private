import 'dotenv/config';
// import {IgApiClient} from '../src';
// import {sample} from 'lodash';
import login from './helper/login';
import list_user from './helper/get-list-own-user';

(async () => {
    Promise.all(list_user().map(async (el, idx) => {
        return new Promise(function (rs, rj) {
            setTimeout(async function () {
                try {
                    const loginInfo = await login(el);
                    // const auth = loginInfo.auth;
                    const ig = loginInfo.ig;
                    const userId = await ig.user.getIdByUsername('moche.official')
                    const user = await ig.user.info(userId)
                    await ig.entity.profile(user.pk).checkFollow()
                    console.log('xong: ' + el.username);
                    rs()
                } catch (e) {
                    console.log('lỗi: ' + el.username);
                    rs()
                }
            }, idx * 5000)
        })
    })).then(res => {
        console.log('xong hết');
    })
})();
