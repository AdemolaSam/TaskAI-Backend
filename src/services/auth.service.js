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
    const hash = bcrypt.hash(createBody.password, 10)
    const { password, ...rest } = createBody
    const userData = { rest, password: hash }
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
   const { password, rest } = user
   return {
     token: token,
     user: rest
   }
}

export const VerifyUser = async(req, res) => {
    
}
