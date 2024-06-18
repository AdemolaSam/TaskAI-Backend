'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      taskName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    startDate: {
        type: Sequelize.DATE
    },

    dueDate: {
        type: Sequelize.DATE,
    },
      projectId: {
        type: Sequelize.UUID,
        references: {
          model: 'Projects', // Assuming your project model name is 'Projects'
          key: 'id',
          onDelete: 'SET NULL'
        },
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.ENUM('Pending', 'Ongoing', 'Done'),
        defaultValue: 'Pending',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: { // Added due to `paranoid: true` in the model
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Tasks');
  }
};
