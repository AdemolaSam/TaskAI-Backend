import { Router } from "express"
import { breakDownProject, testAI, testML } from "../controllers/ai.controller.js"

const router = Router()

router.post('/test', testAI)
router.post('/tst', testML)
router.post('/project', breakDownProject)


export default router