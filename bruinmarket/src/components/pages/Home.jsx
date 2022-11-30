import React from "react";
import {Navigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'



function Home() {
  const [goAllPosts, setgoToAllPosts] = React.useState(false);

  if (goAllPosts) {

    return <Navigate to="/allposts" />;
  }

  return (
  <div>
    <Center>
        Home
        <Button colorScheme='blue'
      onClick={() => {
        setgoToAllPosts(true);
      }}
      >
        {" "}
        Go to the AllPosts page
      </Button>
   </Center>

  </div>
  )
}

export default Home;