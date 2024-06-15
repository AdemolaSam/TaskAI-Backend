import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false
    },

    projectId: {
        type: DataTypes.UUID,
        references: {
            model: 'Projects',
            key: 'id',
            onDelete: 'SET NULL'
        }
    },

    description: {
        type: DataTypes.TEXT,
    },

    status: {
        type: DataTypes.ENUM('Pending', 'Ongoing', 'Done'),
        defaultValue: 'Pending',
        allowNull: false
    }
}, 
    {
        timestamps: true,
        paranoid: true
    }
)

export default Task