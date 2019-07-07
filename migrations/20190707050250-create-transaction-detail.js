'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TransactionDetails', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ownAccountId: {
                type: Sequelize.INTEGER
            },
            TransactionId: {
                type: Sequelize.INTEGER
            },
            isFollowing: {
                type: Sequelize.BOOLEAN
            },
            postLiked: {
                type: Sequelize.STRING
            },
            UserId: {
                allowNull: true,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TransactionDetails');
    }
};
