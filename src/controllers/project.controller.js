import httpStatus from "http-status"
import { createProject } from "../services/project.service.js"
import { AppError } from "../middlewares/error.js"

export const createNewProject = async(req, res) => {
    try {
        const newProject = await createProject(req.body)
        return newProject
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpStatus.BAD_REQUEST).json({
                message: error.message
            })
        }

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}