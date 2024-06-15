import nodemailer from 'nodemailer'
import {
    otpMailTemp,
    projectCreationEmailTemp,
    welcomeMailTemp
} from "../utils/emailTemplates.js"

const transporter = nodemailer.createTransport({
    host: '',
    port: '',
    auth: {
        user: '',
        pass: ''
    }
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

export const sendWelcomeMail = async(sender, receiver, subject, html) => {
    await mailSend(sender, receiver, subject, html=welcomeMailTemp)
}


export const sendOtp = async(sender, receiver, subject, html) => {
    await mailSend(sender, receiver, subject, html=otpMailTemp)
}

export const sendProjectCreationEmail = async(sender, receiver, subject, html) => {
    await mailSend(sender, receiver, subject, html=projectCreationEmailTemp)
}


export default mailSend