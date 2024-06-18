import {Router} from "express"
import authRoute from "./auth.route.js"
import userRoute from "./user.route.js"
import projectRoute from "./project.route.js"
import taskRoute from "./task.route.js"
import aiRoute from "./ai.route.js"

const router = Router()

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/project',projectRoute)
router.use('./task', taskRoute)
router.use('./ai', aiRoute)


export default router
