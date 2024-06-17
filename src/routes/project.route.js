import { Router } from "express"
import { createNewProject, deleteProjectById, fetchProjectById, getAllUserProjects } from "../controllers/project.controller"

const router = Router()

router.post('/', createNewProject)
router.get('/:projectId', fetchProjectById)
router.get('/all', getAllUserProjects)
router.delete('/:projectId', deleteProjectById)


export default router