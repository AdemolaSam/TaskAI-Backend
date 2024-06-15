import httpStatus from "http-status"
import {
    countAllUsers,
    getUserByEmail,
    getUserById,
    updateUser
} from "../services/user.service.js"
import { AppError } from "../middlewares/error.js"

export const getUserById = async(req, res) => {
    try {
        const user = await getUserById(req.params.userId)  
        return res.status(httpStatus.OK).json(user)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpStatus.NOT_FOUND).json({
                message: error.message
            })
        } 
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}