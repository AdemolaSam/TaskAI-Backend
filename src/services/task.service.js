import Task from "../models/Task.model";
import { AppError } from "../middlewares/error";

export const createTask = async(taskObj) => {
    const newTask = await Task.create(taskObj)
    if(!newTask){
        throw new AppError("Failed to create task. Please try again.")
    }
    return newTask
}

export const getTaskById = async(taskId) => {
    const task = await Task.findByPk(taskId)
    if(!task){
        throw new AppError
    }
    return task
}

export const getTasksByProject = async (projectId) => {
    const tasks = await Task.findAll({
        where: {
            projectId: projectId
        }
    })

    return tasks
}

export const deleteTask = async(taskId) => {
    const task = await getTaskById(taskId)
    return await task.destroy()
}