import httpstatus from "http-status"
import { createTask } from "../services/task.service.js"
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