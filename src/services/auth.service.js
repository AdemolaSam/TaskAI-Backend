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
    await sendWelcomeMail(newUser.email, newUser.firstName)
    return newUser
}


export const sendUserOtp = async(email) => {
    const user = await getUserByEmail(email)
    if(!user){
        throw new AppError('No User email found')
    }
    const otpGenerated = generateOTP()
    user.otp = otpGenerated
    await sendOtp(email, otpGenerated)
    
    user.otpExpiry = new Date(Date.now() + 1000 * 60 * 30)
    await user.save()
    return "An email has been sent to you containing OTP for your account verification"
}

export const verifyOTP = async(email, otp) => {
    const user = await getUserByEmail(email)
    if(user.otp !== otp){
        throw new AppError('Invalid OTP')
    }
    if(user.otpExpiry < Date.now()) {
        throw new AppError('OTP Expired')
    }
    user.otp = null
    user.otpExpiry = null
    await user.save()
    return "Account verification successful!"
}

export const loginUser = async (loginBody)=> {
    const user = await getUserByEmail(loginBody.email)
    if(!user){
        console.log("User not found")
        throw new Error("Please sign up to continue.")
    }

    const userVerified = bcrypt.compare(loginBody.password, user.password)
    if(!user.isVerified){
       throw new AppError("Please verify your account before you continue")
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