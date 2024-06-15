import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken"
import httpStatus from "http-status"

const decodeToken = (req, res, next) => {
    const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : (req.cookies ? req.cookies.accessToken : null)

      if (!token) {
        console.log("Token Missing!")
        return res.status(httpStatus.UNAUTHORIZED).json({
            message: "Please sign up/ sign in to continue"
        })
      }

      try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verifiedToken
        next()
      } catch (error) {
        if(error instanceof TokenExpiredError){
            console.log("Tokem Expired. Sign in to continue")
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Token Expired. Sign in to continue"
            })
        }

        if(error instanceof JsonWebTokenError) {
            console.log("JWT Error")
            return res.status(httpStatus.UNAUTHORIZED).json({
                error: "Failed to authenticate",
                mesage: error.message
            })
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            mesage: "Internal Server Error",
            error: error.mesage
        })
      }
}


export default decodeToken