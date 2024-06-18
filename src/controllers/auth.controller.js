import httpStatus from "http-status"
import {
    registerUser,
    loginUser,
    verifyOTP,
    sendUserOtp
} from "../services/auth.service.js"
import { AppError } from "../middlewares/error.js"

export const register = async (req, res) => {
    try {
        const createBody = req.body
        const newUser = await registerUser(createBody)   
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
        const userData = await loginUser(req.body)
        res.cookie('accessToken',
            userData.token,
            {
                httpOnly: false,
                maxAge: 24 * 60 * 60 * 1000 //24 hours
            }
        )
        
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

export const getOTP = async(req, res) => {
    try {
        const result = await sendUserOtp(req.body.email)   
        return res.status(httpStatus.OK).json({
            message: result
        })
    } catch (error) {
        if(error instanceof AppError) {
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

export const verifyUserOTP = async(req, res) => {
    const email = req.body.email
    const otp = req.body.otp
    try {
        const result = await verifyOTP(email, otp)
        return res.status(httpStatus.OK).json(result)
    } catch (error) {
        if(error instanceof AppError) {
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