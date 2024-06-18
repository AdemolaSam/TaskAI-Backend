import Task from "../models/Task.model.js";
import { AppError } from "../middlewares/error.js";

export const createTask = async(taskObj) => {
    const newTask = await Task.create(taskObj)
    if(!newTask){
        throw new AppError("Failed to create task. Please try again.")
    }
    return newTask
}

export const createMultipleTasks = async(multipleTaskObj) => {
    const tasks = await Task.bulkCreate(multipleTaskObj)
    if(!tasks){
        throw new AppError("Failed to create multiple tasks. Please try again")
    }
    return tasks
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