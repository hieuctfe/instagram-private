import {IgApiClient} from '../src';

export default function (userInfo) {
    return new Promise(async function(rs,rj) {
        const ig = new IgApiClient();
        console.log(userInfo.proxy);
        ig.state.generateDevice(userInfo.username);
        ig.state.proxyUrl = userInfo.proxy
        const auth = await ig.account.login(userInfo.username, userInfo.password);
        rs({
            auth: auth,
            ig: ig
        })
    })
}
