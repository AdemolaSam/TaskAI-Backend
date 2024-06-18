import httpStatus from "http-status";
import {generateTasks, getChatGPTResponse, testAIML} from "../services/ai.service.js"

export const testAI = async(req, res) => {
    try {
        const response = await getChatGPTResponse(req.body.prompt)
        return res.status(httpStatus.OK).json({
            message: response
        })
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}

export const testML = async(req, res) => {
    try {
        const response = await testAIML()
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}


export const breakDownProject = async (req, res) => {
    try {
        const project = req.body.project
        const startDate = req.body.startDate
        const endDate = req.body.endDate
        const response = await generateTasks(project, startDate, endDate)
        return res.status(httpStatus.OK).json(response)
    } catch (error) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: error.message
        })
    }
}