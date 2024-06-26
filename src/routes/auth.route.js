import { Router } from "express"
import {
    register,
    login,
    logout,
    getOTP,
    verifyUserOTP
} from "../controllers/auth.controller.js"

const router = Router()

router.get('/', (req, res) => {
    return res.send("Hello world")
})

router.post('/', register)
router.post('/login', login)
router.post('/logout', logout)
router.put('/otp', getOTP)
router.put('/verify', verifyUserOTP)


export default router