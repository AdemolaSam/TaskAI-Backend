export const welcomeMailTemp= (username, otp) => {
    return `
        <div style="width: 100%; background: white; color: black; ">
            <h1>Welcome aboard ${username}</h1>
            <p>Manage your projects efficiently with TaskMe</p>
            <p>Take advantage of the integrated AI in Taskme to breakdown and manage your tasks</p>
            <p>Enjoy Awesome deals and impeccable service.<p/>
            <div style="margin-top: 10%; border:blue solid 2px; padding: 10px;">
                <p>Kindly verify your email Address with the OTP below</p>
                <p style="font-size:30px; font-weight:500; color: blue;">${otp}</p>
            </div>
        </div>   
    `
}

export const otpMailTemp = (otp)=> {
    return  `
    <center>
        <p>Verify your account with this One Time Password. </p>
        <p>It expires in 1 hour</p>
        <b>${otp}</b>
    </center>
`
}



export const projectCreationEmailTemp = (projectName) => {
    return `
    <div style="margin: auto; width: 100%; background: grey; ">
        <p>You have successfully created a new project</p>
        <p>Project Name: ${projectName}</p>
    </div>
`   
}

