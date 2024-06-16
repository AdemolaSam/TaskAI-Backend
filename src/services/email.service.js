import nodemailer from 'nodemailer'
import {
    otpMailTemp,
    projectCreationEmailTemp,
    welcomeMailTemp
} from "../utils/emailTemplates.js"

const appEmail = 'katashisasaki318@gmail.com'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: '587',
    auth: {
        user: 'katashisasaki318@gmail.com',
        pass: 'vxlbhitekasvqunz'
    },
    logger: true
})

const mailSend = async (sender, receiver, subject, html, text) => {
    const emailInfo = await transporter.sendMail({
        from: sender,
        to: receiver,
        subject: subject,
        html: html,
        text: text,
    })
    
    console.log(`Message sent to: ${emailInfo.messageId}`)
}

mailSend().catch(err => console.log(err.message))

export const sendWelcomeMail = async(address) => {
   return await mailSend(appEmail, address, 'Welcome To TaskAI', welcomeMailTemp)
}


export const sendOtp = async(address) => {
    return await mailSend(appEmail, address, 'Account Verification', otpMailTemp)
}

export const sendProjectCreationEmail = async(address) => {
    return await mailSend(appEmail, address, 'Project Created', projectCreationEmailTemp)
}


export default mailSend