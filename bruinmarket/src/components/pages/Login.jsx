import React, { useState } from "react";
import {
  Button,
  Container,
  Input,
  Stack,
  Link,
  Text,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import login from "../../newlogin";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setStatus] = useState(5);
  const [showPassword, setShowPassword] = useState(false);
  const handleClick = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const getStatusMessage = (status) => {
    switch (status) {
      case 0:
        return `Logging in ...`;
      case 1:
        return `The user associated with the entered email has been disabled`;
      case 2:
        return `The email address entered is invalid`;
      case 3:
      case 4:
        return `Email or password is incorrect. Please try again`;
      default:
        return ``;
    }
  };

  async function Submit(e) {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    // insert call to database to verify email and password
    const loginResult = await login(email, password);
    // if user authenticated, get whatever information we need related to their information

    // reroute to home page if authenticated
    // otherwise don't change page and show some error
    if (!loginResult) {
      navigate("/");
    } else {
      setStatus(loginResult);
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
            <InputGroup size="md">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Link href="/">
              <Button type="submit">Sign in</Button>
            </Link>

            <Link href="/register">Don't have an account, register here!</Link>

            <Text color="red"> {getStatusMessage(loginStatus)} </Text>
          </Stack>
        </form>
      </Container>
    </Container>
  );
}

export default Login;
