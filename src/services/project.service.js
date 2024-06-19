import Project from "../models/project.model.js"

import { AppError } from "../middlewares/error.js";

export const createProject = async(projectObj) => {
    const newProject= await Project.create(projectObj)
    if(!newProject){
        throw new AppError("Failed to create task. Please try again.")
    }
    return newProject
}

export const getProjectById = async(projectId) => {
    const project = await Project.findByPk(projectId)
    if(!project){
        throw new AppError("The requested project could not be found. Please try again.")
    }
    return project
}

export const getUserProjects = async (userId) => {
    const projects = await Project.findAll({
        where: {
            creator: userId
        }
    })

    if(!projects){
        throw new AppError("Couldn't find projects now. Please try again later")
    }
    return projects
}

export const deleteProject = async(projectId) => {
    const project = await getProjectById(projectId)
    return await project.destroy()
}