import User from "../models/user.model";
import bcrypt from "bcrypt"
import { getUserByEmail } from "./user.service";
import { AppError } from "../middlewares/error";
import generateToken from "../utils/token";
import { sendWelcomeMail, } from "./email.service";

export const register = async (createBody) => {
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

export const login = async (email, password)=> {
    const user = await getUserByEmail(email)
    if(!user){
        console.log("User not found")
        throw new Error("Please sign up to continue.")
    }
    const userVerified = bcrypt.compare(password, user.password)
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

