import { Router } from "express"
import { updateUserPassword, updateUser } from "../controllers/user.controller"

const router = Router()

router.get('/', (req, res) => {
    return res.send('User route')
})

router.put('/:id/update', updateUser)
router.put('/update', updateUserPassword)

export default router