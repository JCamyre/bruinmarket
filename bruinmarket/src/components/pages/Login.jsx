import React, { useState } from "react";
import { Button, Container, Input, Stack, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);

    // insert call to database to verify email and password

    // if user authenticated, get whatever information we need related to their information

    // reroute to home page if authenticated
    // otherwise don't change page and show some error
    if (true) {
      navigate("/");
    } else {
      console.log("BAD");
    }
  }

  return (
    <Container maxW="container.md" pt="40">
      <Container maxW="md">
        <form onSubmit={Submit} method="POST">
          <Stack spacing="8">
            <Input
              placeholder="username"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <Link href="/">
              <Button type="submit">Sign in</Button>
            </Link>

            <Link href="/">Don't have an account, register here!</Link>
          </Stack>
        </form>
      </Container>
    </Container>
  );
}

export default Login;
