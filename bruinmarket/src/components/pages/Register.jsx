import React, {useState} from "react"
import {Input, Button, Text, VStack, Heading, Container, Link, InputGroup, InputRightElement} from "@chakra-ui/react"
import register from "../../register.js"
import login from "../../newlogin"
import { useNavigate } from "react-router-dom"; 



function Registration() {
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [submittedEmail, setSubmittedEmail] = useState()
    const [password, setPassword] = useState()
    const [status, setStatus] = useState(5)
    const [showPassword, setShowPassword] = useState(false);
    const handleClick = () => setShowPassword(!showPassword);

    const navigate = useNavigate();


    async function Submit(e) {
        e.preventDefault();
        console.log(`Email: ${email}, Password: ${password}`);
    
        // insert call to database to verify email and password
        const registerResult = await register(username, email, password)
        let loginResult = null
        if (!registerResult) {
            loginResult = await login(email, password)
        }
        setStatus(registerResult);
        setSubmittedEmail(email);
        // if user authenticated, get whatever information we need related to their information
    
        // reroute to home page if authenticated
        // otherwise don't change page and show some error
        if (registerResult) {
            return
        }
        if (!loginResult) {
          navigate("/");
        } else {
          setStatus(loginResult)
        }
      }

    const getStatusMessage = (status) =>
    {
        console.log(status)
        switch (status) {
            case -1:
                return `Email must be under domain "g.ucla.edu"`
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
            <Container maxW='container.md' pt = '40'>
            <VStack>
            <Heading>Register Here!</Heading>
            <Input placeholder="username" onChange={e=>setUsername(e.currentTarget.value)}></Input>
            <Input placeholder="email" onChange={e=>setEmail(e.currentTarget.value)}></Input>
            <InputGroup size='md'>
            <Input type = {showPassword ? "text" : "password"}
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            </InputRightElement>
            </InputGroup>

            <Button onClick={Submit}>Register</Button>
            <Text color="red"> {getStatusMessage(status)} </Text>
            <Link href="/login">Already have an account, log in here!</Link>
            </VStack>
            </Container>
        </div>
    )
}

export default Registration