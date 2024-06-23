import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Project from "./project.model.js";

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    taskName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    startDate: {
        type: DataTypes.DATE
    },

    dueDate: {
        type: DataTypes.DATE,
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

Task.belongsTo(Project, { foreignKey: 'projectId' })
Project.hasMany(Task, { foreignKey: 'projectId' })

export default Task