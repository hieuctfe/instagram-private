import login from "../helper/login";

const Model = require('../models')

export default {
    auto_follow: async (request, response) => {
        const username = request.body.username
        const number = request.body.number
        let random_account_list = []
        const result = await Model.User.findAll()
        if (number && number > result.length) {
            response.json({
                status: false,
                message: "Số lượng account không đủ"
            })
        } else {
            while (random_account_list.length < number) {
                random_account_list.push(result[Math.floor(Math.random() * result.length)])
            }
            Promise.all(random_account_list.map(async (userInfo, idx) => {
                return new Promise(function (rs, rj) {
                    setTimeout(async function () {
                        try {
                            const loginInfo = await login(userInfo);
                            // const auth = loginInfo.auth;
                            // @ts-ignore
                            const ig = loginInfo.ig;
                            const userId = await ig.user.getIdByUsername(username)
                            const user = await ig.user.info(userId)
                            await ig.entity.profile(user.pk).checkFollow()
                            console.log('xong: ' + userInfo.username);
                            rs()
                        } catch (e) {
                            console.log('lỗi: ' + userInfo.username);
                            rs()
                        }
                    }, idx * 5000)
                })
            })).then(res => {
                console.log('xong hết');
            })
            response.json({
                status: true,
                message: "Đã thực hiện lệnh"
            })
        }
    },
    test: async function (request, response) {

        await Model.User.create({
            username: 'Adalia.workshop',
            password: '25161114',
            proxy: 'http://lephuong1199539:88sxWuuoJip0@45.63.4.66:25346'
        })
        // await Model.TransactionDetail.create({
        //     userId: '1',
        //     transactionId: '1',
        //     isFollowing: true,
        //     postLiked: "1234",
        // })
        // Model.TransactionDetail.findAll().then(res => {
        //     try {
        //         res[0].getTransaction().then(function (res1) {
        //             response.json(res1)
        //         });
        //     } catch (e) {
        //         console.log(e);
        //     }
        // });
        response.json({status: true})
    }
}

