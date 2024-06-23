export const welcomeMailTemp= (username, otp) => {
    return `
        <div style="max-width: 60%; background: white; color: black; margin: auto; border: black 2px solid; padding: 15px; border-radius: 20px;">
            <h1>Welcome aboard ${username}</h1>
            <p>Manage your projects efficiently with TaskMe</p>
            <p>Take advantage of the integrated AI in Taskme to breakdown and manage your tasks</p>
            <p>Enjoy Awesome deals and impeccable service.</p>
            <div style="margin-top: 20px; ">
                <p>Kindly verify your email Address with the OTP below <b>Note: OTP expires in 30 minutes</b></p>
                <p style="font-size:30px; font-weight:500; color: blue;">${otp}</p>
            </div>
        </div>   
    `
}

export const otpMailTemp = (otp)=> {
    return  `
        <div style="margin: auto; width: 60%; border: black 2px solid; padding: 15px; border-radius: 20px;"> 
            <p>Verify your account with this One Time Password. </p>
            <p>It expires in 30 minutes</p>
            <b style="color: blue; font-size: 30px; font-weight: 500;">${otp}</b>
        </div>
    `
}



export const projectCreationEmailTemp = (projectName) => {
    return `
    <div style="margin: auto; width: 60%; background: white; border: black 2px solid; border-radius: 20px; padding: 15px;">
        <p>You have successfully created a new project</p>
        <p>Project Name: ${projectName}</p>
    </div>
`   
}

