'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      timeline: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dueDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      dueTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      priority: {
        type: Sequelize.ENUM('High', 'Medium', 'Low'),
        allowNull: false
      },
      creator: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
          onDelete: 'CASCADE'
        },
        allowNull: false
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      numberOfTasks: {
        type: Sequelize.INTEGER
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};