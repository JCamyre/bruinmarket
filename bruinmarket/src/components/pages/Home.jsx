import React from "react";

import {Navigate} from "react-router-dom";
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle, Box, Text } from '@chakra-ui/react'
import { Heading, Image } from '@chakra-ui/react'
import { Stack, HStack, VStack, Flex, Spacer } from '@chakra-ui/react'



function Home() {
  const [goAllPosts, setgoToAllPosts] = React.useState(false);

  if (goAllPosts) {

    return <Navigate to="/allposts" />;
  }

  return (
    <>
      <div class="homepage">
        <Center>
          <Heading>HomePage</Heading>
        </Center>
      </div>

      <div class="button-wrapper">
        <Center>
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
        </Stack>
      </div>
      <div>
        <Stack direction='row' spacing='200px'>
          <Box maxW='32rem'>
            <Heading mb={2} size='l'>
              $input_price <br></br>
              input_itemname
            </Heading>
            <Text fontSize='m'>
              input_location
              <br></br>
              input_description
            </Text>
            <Button size='md' colorScheme='green' mt='12px'>
              View item
            </Button>
          </Box>

          <Box maxW='32rem'>
            <Heading mb={2} size='l'>
              $input_price <br></br>
              input_itemname
            </Heading>
            <Text fontSize='l'>
              input_location
              <br></br>
              input_description
            </Text>
            <Button size='md' colorScheme='green' mt='12px'>
              View item
            </Button>
          </Box>

          <Box maxW='32rem'>
            <Heading mb={2} size='l'>
              $input_price <br></br>
              input_itemname
            </Heading>
            <Text fontSize='l'>
              input_location
              <br></br>
              input_description
            </Text>
            <Button size='md' colorScheme='green' mt='12px'>
              View item
            </Button>
          </Box>
        </Stack>
        
      </div>
  </>
  )
}
  

export default Home;