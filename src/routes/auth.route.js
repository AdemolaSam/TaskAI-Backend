import { Router } from "express"
import {
    register,
    login,
    logout
} from "../controllers/auth.controller.js"

const router = Router()

router.get('/', (req, res) => {
    return res.send("Hello world")
})

router.post('/', register)
router.post('/login', login)
router.post('/logout', logout)


export default router