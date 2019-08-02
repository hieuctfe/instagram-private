const Model = require('../models');
import sequelize from 'sequelize';
export default {
  create: async function(request, response) {
    const data = request.body;
    // response.json(data)
    try {
      await Model.Transaction.create({
        customerUserName: data.customerUserName,
        packageId: data.packageId,
        phone: data.phone,
        note: data.note,
      });
      response.json({
        status: true,
      });
    } catch (e) {
      response.json({
        status: false,
        message: e,
      });
    }
  },
  get: async function(request, response) {
    const Op = sequelize.Op;
    const request_data = request.body;
    const txtSearch = request_data.txtSearch ? request_data.txtSearch : '';
    try {
      const result = await Model.Transaction.findAll({
        where: {
          customerUserName: {
            [Op.like]: '%' + txtSearch + '%',
          },
          phone: {
            [Op.like]: '%' + txtSearch + '%',
          },
        },
      });
      response.json(result);
    } catch (e) {
      response.json({
        status: false,
      });
    }
  },
  delete: async function(request, response) {
    const userId = request.body.id;
    if (userId) {
      try {
        const result = await Model.User.destroy({
          where: {
            id: userId,
          },
        });
        response.json({
          status: true,
          message: 'Deleted successfuly',
        });
      } catch (e) {
        response.json({
          status: false,
          message: 'No record deleted',
        });
      }
    } else {
      response.json({
        status: false,
        message: 'Id is require',
      });
    }
  },
};
