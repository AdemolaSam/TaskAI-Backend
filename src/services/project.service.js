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
        throw new AppError("Project creation failed. Please try again.")
    }
    return project
}

export const getUserProjects = async (userId) => {
    const projects = await Project.findAll({
        where: {
            projectId: userId
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