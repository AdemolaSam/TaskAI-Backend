import httpStatus from "http-status"
import { createProject, deleteProject, getProjectById, getUserProjects } from "../services/project.service.js"
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

export const fetchProjectById = async(req, res) => {
    try {
        const project = await getProjectById(req.params.projectId)
        return res.status(httpStatus.OK).json(project)
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

export const getAllUserProjects = async(req, res) => {
    try {
        const projects = await getUserProjects(req.user)
        return res.status(httpStatus.OK).json(projects)
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

export const deleteProjectById = async(req, res) => {
    try {
        await deleteProject(req.params.projectId)
        return res.status(httpStatus.NO_CONTENT).json({
            message: "Project Deleted"
        })
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