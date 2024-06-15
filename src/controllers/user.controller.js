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

export const updateUser = async(req, res) => {
    try {
        const updatedUser = await updateUser(
            req.params.userId,
            req.body
        )
        return res.status(httpStatus.OK).json({
            updateUser
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpStatus.FAILED_DEPENDENCY).json({
                message: error.message
            })
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}

export const getUserByEmail = async(req, res) => {
    try {
        const user = await getUserByEmail(req.body.email)
        return res.status(httpStatus.OK).json(user)
    } catch (error) {
        if(error instanceof AppError) {
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

export const countAllUsers = async(req, res) => {
    try {
        const usersCount = await countAllUsers()
        return res.status(httpStatus.OK).json(usersCount)
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}