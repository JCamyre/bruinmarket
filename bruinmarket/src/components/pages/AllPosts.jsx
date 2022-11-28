import React from "react";
import {Navigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'


function AllPosts() {
  const [goHome, setgoToHome] = React.useState(false);

  if (goHome) {
    return <Navigate to="/" />;
  }

  return (
  <div>
    <Center>
        AllPosts
        <Button colorScheme='blue'
      onClick={() => {
        setgoToHome(true);
      }}
      >
        {" "}
        Go to the Home page
      </Button>
   </Center>

  </div>
  )
}

export default AllPosts;