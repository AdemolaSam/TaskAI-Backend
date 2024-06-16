import nodemailer from 'nodemailer'
import {
    otpMailTemp,
    projectCreationEmailTemp,
    welcomeMailTemp
} from "../utils/emailTemplates.js"

const appEmail = 'taskme.ai.org@gmail.com'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
        user: 'taskme.ai.org@gmail.com',
        pass: 'TaskAI@Me'
    },
    logger: true
})

const mailSend = async (sender, receiver, subject, html, text) => {
    const emailInfo = await transporter.sendMail({
        from: '',
        to: '',
        subject: '',
        html: '',
        text: '',
    })
    
    console.log(`Message sent to: ${emailInfo.messageId}`)
}

mailSend().catch(err => console.log(err.message))

export const sendWelcomeMail = async(sender=appEmail, receiver, subject, html) => {
   return await mailSend(sender, receiver, subject, html=welcomeMailTemp)
}


export const sendOtp = async(sender=appEmail, receiver, subject, html) => {
    return await mailSend(sender, receiver, subject, html=otpMailTemp)
}

export const sendProjectCreationEmail = async(sender=appEmail, receiver, subject, html) => {
    return await mailSend(sender, receiver, subject, html=projectCreationEmailTemp)
}


export default mailSend