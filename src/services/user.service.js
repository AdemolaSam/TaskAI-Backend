import { where } from "sequelize";
import { AppError } from "../middlewares/error.js";
import User from "../models/user.model.js";

export const getUserByEmail = (email) => {
    const user = User.findOne({
        where: {
            email: email
        }
    })
    if(!user){
        throw new AppError("User Not found")
    }
    return user
}


export const getUserById = async (userId) => {
    const user = User.findByPk(userId)
    if(!user){
        throw new AppError("User Not Found")
    }
    return user
}

export const updateUser = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if(!user){
        throw new AppError("User Not Found")
    }
    const updatedUser = await user.update(updateBody, {
        where: {
            id: userId
        }
    })
    return updatedUser
}
 
export const updatePassword = async (email, newPassword) => {
    const user = await getUserByEmail(email)
    user.password = newPassword
    await user.save()
    return "You have successfully updated your password."
}

export const countAllUsers = async () => {
    const usersCount = await User.findAndCountAll()
    return {
        "User count": usersCount
    }
}