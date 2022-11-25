import React, { useState } from "react";
import { Button, Container, Input, Stack, Link, Text} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import login from "../../login" 
import { useEffect } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setStatus] = useState(5);

  const navigate = useNavigate();

  const getStatusMessage = (status) =>
  {
      console.log(status)
      switch (status) {
          case 0:
              return `Logging in ...`
          case 1:
              return `The user associated with the entered email has been disabled`
          case 2:
              return `The email address entered is invalid`
          case 3:
          case 4:
              return `Email or password is incorrect. Please try again`
          default:
              return ``
      }
  }

  async function Submit(e) {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    // insert call to database to verify email and password
    const loginResult = await login(email, password, setStatus);
    // if user authenticated, get whatever information we need related to their information

    // reroute to home page if authenticated
    // otherwise don't change page and show some error
    if (!loginResult) {
      navigate("/");
    } else {
      setStatus(loginResult)
    }
  }

  return (
    <Container maxW="container.md" pt="40">
      <Container maxW="md">
        <form onSubmit={Submit} method="POST">
          <Stack spacing="8">
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Link href="/">
              <Button type="submit">Sign in</Button>
            </Link>

            <Link href="/testregister">Don't have an account, register here!</Link>

            <Text color="red"> {getStatusMessage(loginStatus)} </Text>

          </Stack>
        </form>
      </Container>
    </Container>
  );
}

export default Login;
