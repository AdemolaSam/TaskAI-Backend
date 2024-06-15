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
    try {
        const email = req.body.email
        const password = req.body.password
        const userData = await login(email, password)
        res.cookie('accessToken',
            userData.token,
            {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000 //24 hours
            }
        )
        userData.password = ''
        return res.status(httpStatus.OK).json(userData)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: error.message
            })
        }
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('accessToken')
        return res.status(httpStatus.OK).json({
            message: "You have successfully logged out"
        })
    } catch (error) {
        console.log(error)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}