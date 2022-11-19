import React, { useState } from "react";
import { Button, Container, Input, Stack, Link } from "@chakra-ui/react";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Container maxW="container.md" pt="40">
      <Container maxW="md">
        <Stack spacing="8">
          <Input
            placeholder="username"
            onChange={(e) => console.log(e.currentTarget.value)}
          />
          <Input placeholder="password" />
          <Button onClick={(e) => console.log("Yo")}>Sign in</Button>
          <Link href="#">Don't have an account, register here!</Link>
        </Stack>
      </Container>
    </Container>
  );
}

export default Login;
