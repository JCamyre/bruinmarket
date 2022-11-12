import React from "react";
import {ChakraProvider, Center,  Button, ButtonGroup, Heading} from '@chakra-ui/react'

function Profile() {
  return (
    <ChakraProvider>
        <Center>
            <Heading>Your Name</Heading>
        </Center>
        <Center>
            <ButtonGroup>
                <Button>
                    Follow
                </Button>
                <Button>
                    View Profile
                </Button>
                <Button>
                    Report
                </Button>
            </ButtonGroup>
        </Center>
        <hr/>
        <Heading size = 'md'>About</Heading>
        <Heading size = 'sm'>Joined BruinMarket in Year</Heading>
        <hr/>
        <Heading size = 'md'> Market Listings - Number</Heading>
    </ChakraProvider>
  );
}

export default Profile;