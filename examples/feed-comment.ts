import 'dotenv/config';
import {IgApiClient} from '../src';

(async () => {
    const ig = new IgApiClient();
    ig.state.generateDevice(process.env.IG_USERNAME);
    ig.state.proxyUrl = process.env.IG_PROXY;
    const auth = await ig.account.login(process.env.IG_USERNAME, process.env.IG_PASSWORD);
    const userFeed = ig.feed.timeline();
    let myPostsFirstPage = await userFeed.items();
    let second = await userFeed.items();
    let userpostpk = second[0].user.pk
    let location = ig.feed.location(userpostpk).request();
    location.then(res => {
        JSON.stringify(res.sections)
    })
    // console.log(JSON.stringify(second));
    let temp: Array<any> = [...myPostsFirstPage.map(el => el.id), ...second.map(el => el.id)]
    // console.log(myPostsSecondPage[0].image_versions2);
    // temp.forEach(async (el) => {

    try {
        // let feed_comment = await ig.feed.mediaComments(temp[0]).request()
        // ig.media.comment({mediaId: feed_comment.comments[0].pk, text:"Ahihi"}).then(res=> {
        // ig.media.comment()
        ig.media.comment({mediaId: myPostsFirstPage[0].pk, text: "Xin chào...."}).then(res => {
            // console.log(JSON.stringify(res))
        }).catch(er => {
            console.log(er);
        })
        console.log('.................................')
        // console.log(JSON.stringify(feed_comment));
    } catch (e) {
        console.log(e);
    }

    // return await ig.media.unlike({
    //     mediaId: el,
    //     moduleInfo: {
    //         module_name: 'profile',
    //         user_id: auth.pk,
    //         username: auth.username,
    //     },
    //     d: 0,
    // });
    // })
    // Promise.all(temp).then(res => console.log(res))
})();
