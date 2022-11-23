import React from "react";
import { Link, HStack, Box, Image, Spacer } from "@chakra-ui/react";

function Navbar() {
  return (
    <HStack>
      <Box>BruinMarket</Box>
      <Spacer />
      <Link href="/allposts">
        <Image
          borderRadius="full"
          boxSize="100px"
          src="https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
        />
      </Link>
      <Link href="/allposts">bound to fall in love</Link>
    </HStack>
  );
}

export default Navbar;
