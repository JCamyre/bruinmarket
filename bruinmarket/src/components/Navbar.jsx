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

function Navbar() {
  const userData = React.useContext(AuthContext);
  const username = userData ? userData.username : "";
  // const [uid, setUid] = useState("");
  const uid = userData ? userData.uid : "";
  const [profilePic, setProfilePic] = useState(
    "https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
  );
  // const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user, user.uid);
      } else {
        console.log("FUCK OFF BITCH");
      }
    });
  }, []);

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
      <a
        href={`/profile/${uid}`}
        style={{
          display: "flex",
          alignItems: "center",
        }}
        id="profile"
      >
        <Image borderRadius="full" boxSize="80px" src={profilePic} />
        <Text fontSize="xl" pl="4" color="white">
          {username}
        </Text>
      </a>
      {uid && (
        <Button
          onClick={() => {
            logout();

            // if (logout()) {
            //   navigate("/login");
            // }
          }}
        >
          Logout
        </Button>
      )}
      {!uid && (
        <a href="/login">
          <Button>Login</Button>
        </a>
      )}
    </HStack>
  );
}

export default Navbar;
