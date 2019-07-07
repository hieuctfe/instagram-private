import 'dotenv/config';
import {IgApiClient} from '../src';

var schedule = require('node-schedule');

(async () => {
    let cronExpress = '*/15 * * * * *';
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    // const followersFeed = ig.feed.accountFollowers(auth.pk);
    // const wholeResponse = await followersFeed.request();
    // ig.feed.location()
    var j = schedule.scheduleJob(cronExpress, async function (fireDate) {
        const userFeed = ig.feed.timeline();
        let myPostsFirstPage = await userFeed.items();
        console.log(myPostsFirstPage);
        // let whitelist = ['']
        let temp: Array<any> = [...myPostsFirstPage.map(el => el.pk)]
        console.log(temp.length);
        temp.forEach(async (el) => {
            return await ig.media.like({
                mediaId: el,
                moduleInfo: {
                    module_name: 'profile',
                    user_id: auth.pk,
                    username: auth.username,
                },
                d:0
            });
        })
        Promise.all(temp).then()
    });
})();
