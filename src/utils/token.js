import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )
}

export default generateToken