import React, { useContext } from "react";
import {
  ChakraProvider,
  Center,
  Button,
  ButtonGroup,
  Heading,
  Image,
  Text,
  Container,
  VStack,
  StackDivider,
  Box,
} from "@chakra-ui/react";
import profilepic from "../blank-profile-picture-gd2ddd1954_1280.png";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import { database, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { stringify } from "@firebase/util";
import Stars from "../Stars";

function Profile() {
  const { uid } = useParams();
  // To get info for current user,

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getUser() {
      const query = await firestore.query(
        firestore.collection(database, "users"),
        firestore.where("uid", "==", uid)
      );
      const docs = await firestore.getDocs(query);
      let user = "";
      docs.forEach((doc) => {
        user = doc.data();
      });
      setUser(user);
    }
    getUser();

    // ADD THE CODE TO RETRIEVE ALL POSTS ASSOCIATED WITH THEM
    async function getUserPosts() {
      const query = await firestore.query(
        firestore.collection(database, "posts"),
        firestore.where("uid", "==", uid)
      );
      const docs = await firestore.getDocs(query);
      const posts = [];
      docs.forEach((doc) => {
        console.log(doc);
        posts.push(doc.data());
      });
      setPosts(posts);
    }
    getUserPosts();
  }, [uid]);

  // const userData = useContext(AuthContext);
  console.log(posts);
  const username = user ? user.username : "";
  // const username = userData ? userData.username : "User";

  return (
    <Container maxW="container.md" pt="4">
      <VStack spacing="24px" divider={<StackDivider borderColor="gray.200" />}>
        <VStack>
          <Center>
            <Image borderRadius="full" boxSize="150px" src={profilepic} />
          </Center>
          <Center>
            <Heading>
              {username}
              {"\n"}
            </Heading>
          </Center>
          <Center>
            <Stars displayOnly={true} />
          </Center>
        </VStack>
        <VStack>
          <Heading size="md">About</Heading>
          <Text size="sm">Likes to have fun at the beach</Text>
        </VStack>
        <Heading size="md"> Market Listings - #</Heading>
        <Box>
          {posts.map((post) => (
            <Box>
              <Text>{post.title}</Text>
              <Text>{post.summary}</Text>
              <Text>{post.category}</Text>
            </Box>
          ))}
        </Box>
        <Heading size="md">Bought History -</Heading>
      </VStack>
    </Container>
  );
}

export default Profile;
