import React, { useState } from "react";
import {
  Link,
  HStack,
  Box,
  Image,
  Spacer,
  Text,
  Heading,
} from "@chakra-ui/react";
import { AuthContext } from "../App";

function Navbar() {
  const userData = React.useContext(AuthContext);
  const username = userData ? userData.username : "Guest";
  const uid = userData ? userData.uid : "";
  const [profilePic, setProfilePic] = useState(
    "https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
  );

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
    </HStack>
  );
}

export default Navbar;
