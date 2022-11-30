import React from "react";
import {
  Link,
  HStack,
  Box,
  Image,
  Spacer,
  Text,
  Heading,
} from "@chakra-ui/react";

function Navbar() {
  return (
    <HStack pl="12" pr="12">
      <Box>
        <Heading size="xl">BruinMarket</Heading>
      </Box>
      <Spacer />
      <Link href="/allposts">
        <Image
          borderRadius="full"
          boxSize="100px"
          src="https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
        />
      </Link>
      <Text>USERNAMe</Text>
    </HStack>
  );
}

export default Navbar;
