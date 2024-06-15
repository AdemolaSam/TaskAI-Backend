import { where } from "sequelize";
import { AppError } from "../middlewares/error";
import User from "../models/user.model";

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
 
export const countAllUsers = async () => {
    const userCounts = await User.findAndCountAll()
    return {
        "User count": userCounts
    }
}