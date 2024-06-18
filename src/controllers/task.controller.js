import httpstatus from "http-status"
import { createMultipleTasks, createTask, deleteTask, getTaskById, getTasksByProject } from "../services/task.service.js"
import { AppError } from "../middlewares/error.js"

export const createNewTask = async(req, res) => {
    try {
        const newTask = await createTask(req.body)
        return res.status(httpstatus.CREATED).json(newTask)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpstatus.BAD_REQUEST).json({
                message: error.message
            })
        }
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            message: error.messsage,
            error: "Internal Server Error"
        })   
    }
}

export const getTask = async(req, res) => {
    try {
        const task = await getTaskById(req.params.taskId)
        return res.status(httpstatus.OK).json(task)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpstatus.BAD_REQUEST).json({
                message: error.message
            })
        }
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
    
}

export const createMultiple = async(req, res) => {
    try {
        const tasks = await createMultipleTasks(req.body)
        return res.status(httpstatus.CREATED).json(tasks)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpstatus.BAD_REQUEST).json({
                message: error.message
            })
        }

        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}

export const getAllTasksByProject = async(req, res) => {
    try {
        const tasks = await getTasksByProject(req.params.projectId)
        return res.status(httpstatus.OK).json(tasks)
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpstatus.BAD_REQUEST).json({
                message: error.message
            })
        }

        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}

export const deleteTaskById = async(req, res) => {
    try {
        await deleteTask(taskId)
        return res.status(httpstatus.NO_CONTENT).json({
            message: "Task deleted"
        })
    } catch (error) {
        if(error instanceof AppError){
            return res.status(httpstatus.BAD_REQUEST).json({
                message: error.message
            })
        }
        return res.status(httpstatus.INTERNAL_SERVER_ERROR).json({
            message: error.message,
            error: "Internal Server Error"
        })
    }
}