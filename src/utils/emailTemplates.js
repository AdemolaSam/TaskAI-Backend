export const welcomeMailTemp= (username) => {
    return `
        <div style="margin: auto; width: 100%; background: grey; ">
            <h1>Welcome aboard ${username}</h1>
            <p>Manage your projects efficiently with TaskMe</p>
            <p>Take advantage of the integrated AI in Taskme to breakdown and manage your tasks</p>
            <p>Enjoy Awesome deals and impeccable service.<p/>
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

