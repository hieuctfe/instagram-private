import 'dotenv/config';
import { IgApiClient } from '../src';
import { readFileSync } from 'fs';

(async () => {
  const ig = new IgApiClient();
  ig.state.generateDevice(process.env.IG_USERNAME);
  ig.state.proxyUrl = process.env.IG_PROXY;
  await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
  for (let i = 0; i < 50; i++) {
    setTimeout(async function() {
      let test = await ig.user.getIdByUsername('cris.dung');
      // const inboxFeed = ig.feed.directInbox();
      // const threads = await inboxFeed.items();
      // console.log(JSON.stringify(threads[0]));
      const thread = ig.entity.directThread([test + '']);
      let temp = i + 1;
      await thread.broadcastText('Meoz meoz lần thứ ' + temp);
      await thread.broadcastPhoto({
        file: readFileSync('../tools/images/original.jpg'),
      });
    }, i * 2500);
  }
})();
