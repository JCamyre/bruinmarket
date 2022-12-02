import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import {
  Container,
  Box,
  Center,
  Img,
  Text,
  Button,
  VStack,
  Heading,
  Link,
  Spacer,
} from "@chakra-ui/react";
import { AuthContext } from "../../App";
import "./Post.css";

function Post() {
  const { id } = useParams();

  const currentUser = React.useContext(AuthContext);

  // get User based on the Post id
  const [post, setPost] = useState({
    uid: "1324320983201fdasdsafdjaf",
    title: "1994 Honda Civic",
    price: "$1000",
    summary:
      "fdkasfkldjasfkldsakldsajfdsajfkdsajfsdafdsakfjdlsafdsafdsafkdsafadsfdasfdasfdlf",
    bought_uid: currentUser ? currentUser.uid : "",
  });
  const [user, setUser] = useState({
    uid: "1324320983201fdasdsafdjaf",
    username: "pandalover69",
    email: "jwcamry03@gmail.com",
  });

  useEffect(() => {
    const updatedPost = post;
    updatedPost["bought_uid"] = currentUser.uid;
    setPost(updatedPost);
  }, [currentUser]);

  // if you are looking at a post that you bought

  return (
    <Container
      display="flex"
      maxW="container.xl"
      // bg="#eee"
      bg="purple.300"
      borderRadius="16"
      p="8"
      mt="4"
      boxShadow="4px 16px 16px -4px rgb(0 0 0 / 25%);"
    >
      <Box w="60%">
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showIndicators={false}
          showStatus={false}
          borderRadius={24}
        >
          <div>
            <Img src="https://imgs.search.brave.com/iDWBRAOg5OxWbGv_P4lkcXBZQ6__WvX4XEljLG9FP_A/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly9zYmx5/LXdlYi1wcm9kLXNo/YXJlYWJseS5uZXRk/bmEtc3NsLmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8w/Ny8xNTIwNTMxOC9z/aWQtYmFsYWNoYW5k/cmFuLV85YS0zTk81/S0pFLXVuc3BsYXNo/LmpwZw" />
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Dghzc_7RTRGKdeVmWN5zRL0tV24jSh8-1XXp9SvSveg/rs:fit:1200:900:1/g:ce/aHR0cHM6Ly9hc2tn/YW1lci5jb20vd3At/Y29udGVudC91cGxv/YWRzLzIwMjEvMDQv/QnJlZWQtUGFuZGFz/LmpwZw" />
          </div>
          <div>
            <Img src="https://imgs.search.brave.com/Us-94VJX9bkGOxLCqzLhUYllfI9NMAs0IUj9dbpd_TM/rs:fit:1158:693:1/g:ce/aHR0cHM6Ly9zdGF0/aWMucGxhbmV0bWlu/ZWNyYWZ0LmNvbS9m/aWxlcy9yZXNvdXJj/ZV9tZWRpYS9zY3Jl/ZW5zaG90LzE5MjMv/My0xNTU5NzkwMzg2/X2xyZy5wbmc" />
          </div>
        </Carousel>
      </Box>
      <Spacer />
      <Box w="35%" pl="4" color="white">
        <Text fontSize="2xl">{post.title}</Text>
        <Text fontSize="lg">{post.price}</Text>
        <Text fontSize="sm">Listed a day ago in Sacramento, CA</Text>

        <Heading size="md">Details</Heading>
        <Heading size="xs">Condition - New</Heading>
        <Text fontSize="md">Description</Text>
        <Text fontSize="md">{post.summary}</Text>
        {/* If we have to use a location thing, try this: https://www.openstreetmap.org/copyright */}
        <hr />
        <Heading size="md">Seller Information</Heading>
        <VStack display="flex" justifyContent={"left"}>
          <Text fontSize="xl">{user.username}</Text>
          <Text fontSize="xl">Contact me at: {user.email}</Text>
          <a href={`profile/${user.uid}`}>
            <Button color="purple.300">View Profile</Button>
          </a>
        </VStack>
        {/* https://openbase.com/js/react-star-ratings */}
        <Text>{post.bought_uid}</Text>
        {post.bought_uid && currentUser.uid && (
          <Text fontSize="lg">&#9733;&#9733;&#9733;&#9733;&#9733;</Text>
        )}
      </Box>
    </Container>
  );
}

export default Post;
