import 'dotenv/config';
import {IgApiClient} from '../src';

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    let users = []
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const followersFeed = ig.feed.accountFollowers(auth.pk);
    const items = await followersFeed.items();
    users = items
    console.log(users.length);
    // for (let i = 0; i < 2; i++) {
    //     users.shift()
    // }
    while (users.length <= 100000 && users.length > 0) {
        console.log('bắt đầu quét: ' + users[0].username)
        let amount = 1000 - users.length
        let temp_users = await ig.feed.accountFollowers(users[0].pk).items();

        // let id = await ig.user.getIdByUsername(temp_users[0].username)
        // let info = await ig.friendship.show(id)
        // if (!info.following  || !info.incoming_request) {
            if (temp_users.length <= amount) {
                users = [...users, ...temp_users]
            }
            await new Promise(function (rs, rj) {
                Promise.all(temp_users.map(async (el, idx) => {
                    return new Promise(function (rs, rj) {
                        setTimeout(async function () {
                            try {
                                let id = await ig.user.getIdByUsername(el.username + '')
                                let info = await ig.friendship.show(id)
                                // console.log(JSON.stringify(info));
                                // console.log("*******************************")
                                if (!info.following || !info.incoming_request) {
                                    let res: any = await el.checkFollow()
                                    console.log('giây thứ: ' + idx + ' : ' + el.username + ' : following:' + res.status + ' - status: ' + res.status);
                                }
                                rs()
                            } catch (e) {
                                console.log(e);
                                rs()
                            }
                        }, idx * 5000)
                    })
                })).then(res => {
                    console.log('xong user: ' + users[0].username)
                    rs()
                })
            })
        // }
        users.shift()
        // temp_users.forEach()
    }
    // console.log(JSON.stringify(items[0]))
})();
