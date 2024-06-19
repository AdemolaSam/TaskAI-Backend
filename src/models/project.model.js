import { DATE, DataTypes, Sequelize } from "sequelize";
import sequelize from "../config/db.js";

const Project = sequelize.define('Project', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    timeline: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },

    // description: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // },

    dueTime: {
        type: DataTypes.TIME,
        allowNull: false
    },

    priority: {
        type: DataTypes.ENUM('High', 'Medium', 'Low'),
        allowNull: false
    },

    creator: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id',
            onDelete: 'CASCADE'
        },
        allowNull: false
    },

    numberOfTasks: {
        type: DataTypes.INTEGER,
    },

    deletedAt: {
        type: DATE,
        allowNull: true
    }
},
 {
    timestamps: true,
    paranoid: true
 }
)

export default Project