import React from "react";
import {Navigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import styled from 'styled-components'


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

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// export default AllPosts = ({url, key}) => {
//   return <Img src={url} key={key} alt = "" />
// }


export default AllPosts;