import 'dotenv/config';
import { IgApiClient } from '../src';
import { sample } from 'lodash';

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    // const followersFeed = ig.feed.accountFollowers(auth.pk);
    // const wholeResponse = await followersFeed.request();
    const userFeed = ig.feed.user(auth.pk);
    const myPostsFirstPage = await userFeed.items();
    // All the feeds are auto-paginated, so you just need to call .items() sequentially to get next page
    // console.log(myPostsSecondPage[0].image_versions2);
    await ig.media.like({
        // Like our first post from first page or first post from second page randomly
        mediaId: sample([myPostsFirstPage[0].id]),
        moduleInfo: {
            module_name: 'profile',
            user_id: auth.pk,
            username: auth.username,
        },
        d: sample([0, 1]),
    });
})();
