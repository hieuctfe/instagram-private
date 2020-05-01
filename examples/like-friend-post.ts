import 'dotenv/config';
import { IgApiClient } from '../src';
let schedule = require('node-schedule');

(async () => {
  let cronExpress = '*/15 * * * * *';
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  let j = schedule.scheduleJob(cronExpress, async function(fireDate) {
    const userFeed = ig.feed.timeline();
    let myPostsFirstPage = await userFeed.items();
    let pkPosts: Array<any> = myPostsFirstPage.map(post => post.pk);
    let isDone = pkPosts.reduce((preP, pk) => {
      return preP.then(() =>
        ig.media.like({
          mediaId: pk,
          moduleInfo: {
            module_name: 'profile',
            user_id: auth.pk,
            username: auth.username,
          },
          d: 0,
        }),
      );
    }, Promise.resolve());
    isDone.then(() => {
      console.log('done all');
    });
  });
})();
