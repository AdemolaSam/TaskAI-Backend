import { Router } from "express"
import { createNewTask, deleteTaskById, getAllTasksByProject, getTask } from "../controllers/task.controller"
const router = Router()

router.post('/', createNewTask)
router.get('/:taskId', getTask)
router.get('/:projectId', getAllTasksByProject)
router.delete('/:taskId', deleteTaskById)


export default router