import 'dotenv/config';
import {IgApiClient} from '../src';

var schedule = require('node-schedule');
(async () => {
    let cronExpress = '*/15 * * * * *';
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    var j = schedule.scheduleJob(cronExpress, async function (fireDate) {
        let id = await ig.user.getIdByUsername('nhuy.ng_')
        let test = await ig.feed.reelsMedia({userIds: [id + '']});
        let story = test.request()
        story.then(res => {
            console.log(JSON.stringify(res));
            let reels: any = res.reels
            ig.story.seen(reels)
        })
    });
})();
