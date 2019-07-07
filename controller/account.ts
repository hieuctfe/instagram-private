const Model = require('../models')

export default {
    create: async function (request, response) {
        const request_data = request.body;
        try {
            await Model.User.create({
                username: request_data.username,
                password: request_data.password,
                proxy: request_data.proxy
            })
            response.json({
                status: true,
            })
        } catch (e) {
            response.json({
                status: false
            })
        }
    }
}
