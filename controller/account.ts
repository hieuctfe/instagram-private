const Model = require('../models');
import sequelize from 'sequelize';
export default {
  create: async function(request, response) {
    const request_data = request.body;
    if (request_data.username && request_data.password && request_data.proxy) {
      try {
        await Model.User.create({
          username: request_data.username,
          password: request_data.password,
          proxy: request_data.proxy,
          isDelete: false,
        });
        response.json({
          status: true,
        });
      } catch (e) {
        response.json({
          status: false,
        });
      }
    }
  },
  get: async function(request, response) {
    console.log('dsf')
    const Op = sequelize.Op;
    const request_data = request.body;
    const txtSearch = request_data.txtSearch ? request_data.txtSearch : '';
    try {
      const result = await Model.User.findAll({
        where: {
          username: {
            [Op.like]: '%' + txtSearch + '%',
          },
          proxy: {
            [Op.like]: '%' + txtSearch + '%',
          },
          isDelete: false,
        },
      });
      response.json({ data: result, status: true });
    } catch (e) {
      console.log(e)
      response.json({
        status: false,
      });
    }
  },
  delete: async function(request, response) {
    const userId = request.body.id;
    console.log(request.body);
    if (userId) {
      try {
        const result = await Model.User.update(
          { isDelete: true },
          {
            where: {
              id: userId,
            },
          },
        );
        if (result.length) {
          response.json({
            status: true,
            message: 'Deleted successfuly',
          });
        } else {
          response.json({
            status: true,
            message: "Can't not found account",
          });
        }
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
  update: async function(request, response) {
    const userId = request.body.id;
    console.log(request.body);

    if (userId) {
      try {
        const result = await Model.User.update(request.body, {
          where: {
            id: userId,
          },
        });
        if (result.length) {
          response.json({
            status: true,
            message: 'Update successfuly',
          });
        } else {
          response.json({
            status: true,
            message: "Can't not found account",
          });
        }
      } catch (e) {
        response.json({
          status: false,
          message: 'No record updated',
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
