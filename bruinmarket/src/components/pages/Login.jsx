import React, { useState } from "react";
import { Button, Container, Input, Stack, Link } from "@chakra-ui/react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function Submit(e) {
    e.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
    // need to redirect to / page
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
