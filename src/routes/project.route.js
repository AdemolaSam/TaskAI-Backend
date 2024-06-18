import { Router } from "express"
import { createNewProject, deleteProjectById, fetchProjectById, getAllUserProjects } from "../controllers/project.controller.js"

const router = Router()

router.post('/', createNewProject)
router.get('/:projectId', fetchProjectById)
router.get('/all', getAllUserProjects)
router.delete('/:projectId', deleteProjectById)


export default router


userName=pipeops_user
password=bf2116557cc08e265fb34c0c0
databaseName=taskai_dev
port=3306
host=crimson-bird.demonic-ticket-production.svc.pipeops.internal
