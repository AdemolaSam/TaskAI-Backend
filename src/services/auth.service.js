import User from "../models/user.model.js";
import bcrypt from "bcrypt"
import { getUserByEmail } from "./user.service.js";
import { AppError } from "../middlewares/error.js";
import generateToken from "../utils/token.js";
import { sendWelcomeMail, } from "./email.service.js";

export const registerUser = async (createBody) => {
    const userExists = await getUserByEmail(createBody.email)
    if(userExists){
        throw new Error("This email is not available. Please try another email")
    }
    const hash = await bcrypt.hash(createBody.password, 10)
    
    const userData = { ...createBody, password:hash }
    const newUser = await User.create(userData)
    await sendWelcomeMail()
    return newUser
}

export const loginUser = async (loginBody)=> {
    const user = await getUserByEmail(loginBody.email)
    if(!user){
        console.log("User not found")
        throw new Error("Please sign up to continue.")
    }
    const userVerified = bcrypt.compare(loginBody.password, user.password)
    if(!userVerified){
        throw new AppError("Invalid Credentials. Please try again with valid credentials")
    }
   const token = generateToken(user)
   return {
     token: token,
     user: user
   }
}

export const VerifyUser = async(req, res) => {
    
}
