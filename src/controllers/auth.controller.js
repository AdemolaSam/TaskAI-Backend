import httpStatus from "http-status"
import {
    register,
    login
} from "../services/auth.service.js"
import { AppError } from "../middlewares/error.js"

export const register = async (req, res) => {
    try {
        const createBody = req.body
        const newUser = await register(createBody)   
        return res.status(httpStatus.CREATED).json(newUser)
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

export const login = async (req, res) => {

}