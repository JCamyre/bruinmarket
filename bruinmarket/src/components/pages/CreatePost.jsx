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
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  function Submit(e) {
    e.preventDefault();
    // need to redirect to / page
    console.log(`Title: ${title}, Summary: ${summary}, Category: ${category}`);

    // Maybe we'll add a check to check for duplicate posts, but for now, just push to the Post table
    // WE NEED TO ADD A DATABASE CALL THAT RETURNS THE ID OF THE CURRENT USER LOGGED IN

    // database.post(user_id, title, summary, category)

    // pictures we will figure out.

    // If everything goes well, just redirect
    if (true) {
      return navigate("/");
    } else {
      console.log("You fricked up");
    }
  }

  // img should be a file
  function uploadPicture(imgs) {
    const imgsArr = [...imgs];

    imgsArr.forEach((img, i) => {
      // FOR EACH IMAGE, UPLOAD THE FILE TO FIREBASE, WITH THE OUR WACKY NAMING SYSTEM
      // POSTID + _ + PICTURE NUMBER (use the i variable for PICTURE NUMBER)
      console.log(img, i);
    });
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
            <FormLabel>Category</FormLabel>
            <Select
              placeholder="Select category"
              onChange={(e) => setCategory(e.currentTarget.value)}
            >
              <option>Cars</option>
              <option>Books</option>
            </Select>
          </FormControl>
          <Input
            type="file"
            placeholder="filename"
            multiple
            onChange={(e) => uploadPicture(e.currentTarget.files)}
          />
          <Button type="submit" maxW="sm">
            Post!
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePost;
