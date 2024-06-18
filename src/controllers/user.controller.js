import httpStatus from "http-status"
import {
    countAllUsers,
    getUserByEmail,
    getUserById,
    updateUser
} from "../services/user.service.js"
import { AppError } from "../middlewares/error.js"

export const getUser = async(req, res) => {
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

export const updateUserProfile = async(req, res) => {
    try {
        const updatedUser = await updateUser(
            req.params.userId,
            req.body
        )
        return res.status(httpStatus.OK).json(updatedUser)
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

export const updateUserPassword = async(req, res) => {
    try {
        const updated = await updateUser(req.body.email, req.body.newPassword)   
        return res.status(httpStatus.OK).json({
            message: updated
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: error.message
            })
        }
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }

}

export const fetchUserByEmail = async(req, res) => {
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

export const fetchcountAllUsers = async(req, res) => {
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