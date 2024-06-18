import { Router } from "express"
import { updateUserPassword, updateUserProfile } from "../controllers/user.controller.js"

const router = Router()

router.get('/', (req, res) => {
    return res.send('User route')
})

router.put('/:id/update', updateUserProfile)
router.put('/update', updateUserPassword)

export default router