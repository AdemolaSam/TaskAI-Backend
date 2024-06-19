import { Router } from "express"
import decodeToken from "../middlewares/auth.middleware.js"
import { createNewProject, deleteProjectById, fetchProjectById, getAllUserProjects } from "../controllers/project.controller.js"

const router = Router()

router.post('/', decodeToken, createNewProject)
router.get('/all', decodeToken, getAllUserProjects)
router.get('/:projectId', decodeToken, fetchProjectById)
router.delete('/:projectId', deleteProjectById)


export default router