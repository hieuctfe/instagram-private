import 'dotenv/config';
import {IgApiClient, IgCheckpointError} from '../src';
import Bluebird = require('bluebird');
import inquirer = require('inquirer');
import list_user from './helper/get-list-own-user';

(async () => {
    const ig = new IgApiClient();
    const userinfo = list_user()[9]
    console.log(userinfo.username);
    ig.state.generateDevice(userinfo.username);
    ig.state.proxyUrl = userinfo.proxy
    Bluebird.try(async () => {
        await ig.account.login(userinfo.username, userinfo.password);
        // console.log(auth);
    }).catch(IgCheckpointError, async () => {
        console.log(ig.state.checkpoint); // Checkpoint info here
        await ig.challenge.auto(true); // Requesting sms-code or click "It was me" button
        // ig.challenge.selectVerifyMethod('email')
        console.log(ig.state.checkpoint); // Challenge info here
        const {code} = await inquirer.prompt([
            {
                type: 'input',
                name: 'code',
                message: 'Enter code',
            },
        ]);
        console.log(await ig.challenge.sendSecurityCode(code));
    });
})();
