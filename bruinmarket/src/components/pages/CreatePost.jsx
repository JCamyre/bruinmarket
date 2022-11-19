import {
  Container,
  Stack,
  Input,
  Link,
  Button,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");

  function Submit(e) {
    e.preventDefault();
    // need to redirect to / page
    console.log(`Title: ${title}, Summary: ${summary}, Category: ${category}`);
  }

  return (
    <Container maxW="container.md" pt={40}>
      <form onSubmit={Submit} method="POST">
        <Stack spacing="8">
          <Input
            placeholder="Enter title"
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
          <Textarea
            value={summary}
            placeholder="Enter summary"
            onChange={(e) => setSummary(e.currentTarget.value)}
          />
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select
              placeholder="Select category"
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option>Cars</option>
              <option>Books</option>
            </Select>
          </FormControl>
          <Link href="/">
            <Button type="submit">Post!</Button>
          </Link>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePost;
