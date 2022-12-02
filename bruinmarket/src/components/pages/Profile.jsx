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
  Grid,
  GridItem,
  Link,
  Img,
} from "@chakra-ui/react";
import { AuthContext } from "../../App";
import { useParams } from "react-router-dom";
import { database, firestore } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { stringify } from "@firebase/util";
import Stars from "../Stars";
import { getUserPosts, getUserBoughtPosts } from "../../utilities/Posts";

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

  const [currPosts, setCurrPosts] = React.useState([]);
  const [boughtPosts, setBoughtPosts] = React.useState([]);
  useEffect(() => {
    async function getPosts(uid) {
      return await getUserPosts(uid);
    }
    getPosts(uid).then((posts) => {
      setCurrPosts(posts);
    });
  }, []);

  useEffect(() => {
    async function getPosts(uid) {
      return await getUserBoughtPosts(uid);
    }
    getPosts(uid).then((posts) => {
      setBoughtPosts(posts);
    });
  }, []);

  // const userData = useContext(AuthContext);
  console.log(posts);
  const username = user ? user.username : "";
  // const username = userData ? userData.username : "User";

  return (
    <Container maxW="container.md" pt="4" mb="8">
      <VStack spacing="24px" divider={<StackDivider borderColor="gray.200" />}>
        <VStack>
          <Center>
            <Image
              borderRadius="full"
              boxSize="150px"
              src={
                "https://imgs.search.brave.com/A0m1fQUy6bWorptLSy_breSxZNjg6aWtD_JN0KZXMyM/rs:fit:1200:1200:1/g:ce/aHR0cDovL3N0YXRp/Yy5idXNpbmVzc2lu/c2lkZXIuY29tL2lt/YWdlLzUxZGQ2YjBj/ZWFiOGVhYTIyMzAw/MDAxMy9pbWFnZS5q/cGc"
              }
            />
          </Center>
          <Center>
            <Heading>
              {username}
              {"\n"}
            </Heading>
          </Center>
          <Center>
            <Stars uid={user ? user.uid : ""} />
          </Center>
        </VStack>
        <VStack>
          <Heading size="md">About</Heading>
          <Text size="sm">Likes to have fun at the beach</Text>
          <Text size="sm">Loves drinking water in large quantities</Text>
          <Text size="sm">Contributes to piazza frequently</Text>
          <Text size="sm">Still doesn't know Lisp</Text>
          <Text size="sm">Has five pairs of Eggert's New Balances</Text>
        </VStack>
        <Heading size="md"> Market Listings -</Heading>
        <Center w="50%">
          <Grid templateColumns="repeat(2, 1fr)" gap={6} maxW="container.lg">
            {currPosts &&
              currPosts.map((post) => (
                <GridItem
                  w="400px"
                  h="400"
                  color="white"
                  bg="purple.300"
                  borderRadius="16"
                  boxShadow="4px 16px 16px -4px rgb(0 0 0 / 25%);"
                  p="8"
                >
                  <Link class="post" href={`/post/${post.post_id}`}>
                    <Box overflow="hidden">
                      <Img src="https://bit.ly/2Z4KKcF" borderRadius="8" />
                      <Box display="flex" alignItems="baseline">
                        {" "}
                        <Box>
                          <Heading size="xl">{post.title}</Heading>
                          <Heading size="md">{post.category}</Heading>
                          <Heading size="md">${post.price}</Heading>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </GridItem>
              ))}
          </Grid>
        </Center>
        <Heading size="md">Bought History -</Heading>
        <Center w="50%">
          <Grid templateColumns="repeat(2, 1fr)" gap={6} maxW="container.lg">
            {boughtPosts &&
              boughtPosts.map((post) => (
                <GridItem
                  w="400px"
                  h="400"
                  color="white"
                  bg="purple.300"
                  borderRadius="16"
                  boxShadow="4px 16px 16px -4px rgb(0 0 0 / 25%);"
                  p="8"
                >
                  <Link class="post" href={`/post/${post.post_id}`}>
                    <Box overflow="hidden">
                      <Img src="https://bit.ly/2Z4KKcF" borderRadius="8" />
                      <Box display="flex" alignItems="baseline">
                        {" "}
                        <Box>
                          <Heading size="xl">{post.title}</Heading>
                          <Heading size="md">{post.category}</Heading>
                          <Heading size="md">${post.price}</Heading>
                        </Box>
                      </Box>
                    </Box>
                  </Link>
                </GridItem>
              ))}
          </Grid>
        </Center>
      </VStack>
    </Container>
  );
}

export default Profile;
