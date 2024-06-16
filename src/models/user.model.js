import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    otp: {
        type: DataTypes.STRING,
    },

    otpExpiry: {
        type: DataTypes.DATE,
    }
}, 
    {
        timestamps: true,
    }

)

export default User