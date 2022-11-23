import React from "react";
import {Navigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'



function Home() {
  const [goAllPosts, setgoToAllPosts] = React.useState(false);

  if (goAllPosts) {

    return <Navigate to="/allposts" />;
  }

  return (
    <>
      <div>
        <Center>
          <Heading>HomePage</Heading>

          <Button colorScheme='blue'
          onClick={() => {
            setgoToAllPosts(true);
          }}>
          Go to the AllPosts page
          </Button>
        </Center>
      </div>

      <div>
        <Heading as='h3' size='lg'>Today's Picks</Heading>
      </div>

      <div>
        <Stack direction='row'>
          <Image
            height= '200px'
            width= '300px'
            // objectFit='contain'
            src='https://img2.carmax.com/assets/22970819/hero.jpg?width=400'
            alt='Car 1'
          />
          <Image
            height= '200px'
            width= '300px'
            // objectFit='contain'
            src='https://img2.carmax.com/assets/22970819/hero.jpg?width=400'
            alt='Car 2'
          />
          <Image
            height= '200px'
            width= '300px'
            // objectFit='contain'
            src='https://img2.carmax.com/assets/22970819/hero.jpg?width=400'
            alt='Car 3'
          />
          <Image
            height= '200px'
            width= '300px'
            // objectFit='contain'
            src='https://img2.carmax.com/assets/22970819/hero.jpg?width=400'
            alt='Car 4'
          />
          <Image boxSize='200px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
        </Stack>
      </div>
  </>
  )
}
  

export default Home;