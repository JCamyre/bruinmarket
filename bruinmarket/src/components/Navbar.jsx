import React, { useState, useEffect } from "react";
import {
  Link,
  HStack,
  Box,
  Image,
  Spacer,
  Text,
  Heading,
  Button,
} from "@chakra-ui/react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import logout from "../logout";
import { auth } from "../firebase";
import CreatePost from "./pages/CreatePost";

function Navbar() {
  const [uid, setUid] = useState("");
  const [username, setUsername] = useState("");
  const userData = React.useContext(AuthContext);

  const [profilePic, setProfilePic] = useState(
    "https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
  );

  if (userData && username === "") {
    setUsername(userData.username);
    setUid(userData.uid);
    // If we were logged in, but now we logged out
  } else if (!userData && uid !== "") {
    setUsername("");
    setUid("");
  }

  return (
    <HStack pl="12" pr="12" bg="purple.300" pt="4" pb="4">
      <a href="/">
        <Box>
          <Heading size="xl" color="white">
            BruinMarket
          </Heading>
        </Box>
      </a>
      <Spacer />
      {uid && (
        <a href="/createpost" style={{paddingRight: '16px'}}>
        <Button fontSize="xl" color="purple.300">
          Create a Post
        </Button>
      </a>
      )}
      <a
        href={`/profile/${uid}`}
        style={{
          display: "flex",
          alignItems: "center",
        }}
        id="profile"
      >
        <Image borderRadius="full" boxSize="80px" src={profilePic} />
        <Box>
        <Text fontSize="2xl" pl="4" pr="2" color="white">
          {username}
        </Text>
        </Box>

      </a>
      {uid && (
        <Button
        fontSize="xl" color="purple.300"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Button>
      )}
      {!uid && (
        <a href="/login" color='white'>
          <Button fontSize="xl" color="purple.300">Login</Button>
        </a>
      )}
    </HStack>
  );
}

export default Navbar;
