import React from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Container, Box, Center, Img, Text, Button, HStack, Heading } from "@chakra-ui/react";

function Post() {
  const { id } = useParams();
  return (
    <Container display="flex" maxW="container.lg">
      <Box w="75%">
        <Carousel showArrows={true} infiniteLoop={true} showIndicators={false}>
          <div>
            <Img src="https://imgs.search.brave.com/iDWBRAOg5OxWbGv_P4lkcXBZQ6__WvX4XEljLG9FP_A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zYmx5/LXdlYi1wcm9kLXNo/YXJlYWJseS5uZXRk/bmEtc3NsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Ny8xNTIwNTMxOC9z/aWQtYmFsYWNoYW5k/cmFuLV85YS0zTk81/S0pFLXVuc3BsYXNo/LmpwZw" />
            <p>Panda 1</p>
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Dghzc_7RTRGKdeVmWN5zRL0tV24jSh8-1XXp9SvSveg/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9hc2tn/YW1lci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDQv/QnJlZWQtUGFuZGFz/LmpwZw" />
            <p>Minecraft Panda</p>
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Us-94VJX9bkGOxLCqzLhUYllfI9NMAs0IUj9dbpd_TM/rs:fit:1158:693:1/g:ce/aHR0cHM6Ly9zdGF0/aWMucGxhbmV0bWlu/ZWNyYWZ0LmNvbS9m/aWxlcy9yZXNvdXJj/ZV9tZWRpYS9zY3Jl/ZW5zaG90LzE5MjMv/My0xNTU5NzkwMzg2/X2xyZy5wbmc" />
            <p>Cursed Panda</p>
          </div>
        </Carousel>
      </Box>
      {/* When to use box vs stack */}
      <Box w="25%">
        <Text fontSize='2xl'>1994 Honda Civic</Text>
        <Text fontSize='lg'>$0</Text>
        <Text fontSize='sm'>Listed a day ago in Sacramento, CA</Text>
        <HStack>
          <Button>Message</Button>
          <Button>Yo</Button>
          <Button>Yo2</Button>
        </HStack>
        <Heading size='md'>
        Details
        </Heading>
      </Box>
    </Container>
  );
}

export default Post;
