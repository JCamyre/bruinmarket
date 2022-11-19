import React from "react"
import {Input, Button, Text} from "@chakra-ui/react"
import register from "../../register.js"



function Registration() {
    const [username, setUsername] = React.useState()
    const [email, setEmail] = React.useState()
    const [submittedEmail, setSubmittedEmail] = React.useState()
    const [password, setPassword] = React.useState()
    const [accountAlreadyExists, setExists] = React.useState(true)
    const [status, setStatus] = React.useState(5)
    const getStatusMessage = (status) =>
    {
        console.log(status)
        switch (status) {
            case 0:
                return `Successfully registered ${submittedEmail}`
            case 1:
                return `Email address ${submittedEmail} already exists`
            case 2:
                return `Email address ${submittedEmail} is invalid`
            case 3:
                return `Error: operation not allowed`
            case 4:
                return `Password is too weak. Please choose a new password`
            default:
                return ``
        }
    }
    return (
        <div>
            <Input placeholder="username" onChange={e=>setUsername(e.currentTarget.value)}></Input>
            <Input placeholder="email" onChange={e=>setEmail(e.currentTarget.value)}></Input>
            <Input placeholder="password" onChange={e=>setPassword(e.currentTarget.value)}></Input>

            <Button onClick={() => {register(username, email, password, setStatus); setSubmittedEmail(email)}}>Register</Button>
            <Text color="red"> {getStatusMessage(status)} </Text>

        </div>
    )
}

export default Registration