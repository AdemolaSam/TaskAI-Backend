import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { getUserByEmail } from "./user.service.js";
import { AppError } from "../middlewares/error.js";
import generateToken from "../utils/token.js";
import { sendOtp, sendWelcomeMail, } from "./email.service.js";

export const registerUser = async (createBody) => {
    const userExists = await getUserByEmail(createBody.email)
    if(userExists){
        throw new Error("This email is not available. Please try another email")
    }
    const hash = await bcrypt.hash(createBody.password, 10)
    
    const userData = { ...createBody, password:hash }
    const newUser = await User.create(userData)
    await sendWelcomeMail(newUser.email)
    return newUser
}


export const VerifyUser = async(user) => {
    if(!user){
        throw new AppError('No User email found')
    }
    await sendOtp(user.email)
    user.otp = generateOTP()
    user.otpExpiry = new Date(Date.now() + 1000 * 60 * 30)
    await user.save()
    return "An email has been sent to you containing OTP for your account verification"
}

export const verifyOTP = async(user, otp) => {
    if(user.otp !== otp){
        throw new AppError('Invalid OTP')
    }
    if(user.otpExpiry < Date.now()) {
        throw new AppError('OTP Expired')
    }
    user.otp = null
    user.otpExpiry = null
    await user.save()
    loginUser(user)
}

export const loginUser = async (loginBody)=> {
    const user = await getUserByEmail(loginBody.email)
    if(!user){
        console.log("User not found")
        throw new Error("Please sign up to continue.")
    }

    const userVerified = bcrypt.compare(loginBody.password, user.password)
    if(!user.isVerified){
        VerifyUser(user)
    }
    if(!userVerified){
        throw new AppError("Invalid Credentials. Please try again with valid credentials")
    }
   const token = generateToken(user)
   return {
     token: token,
     user: user
   }
}