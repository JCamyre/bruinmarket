import React from "react";
import { AuthContext } from "../../App";
import { Button, HStack, VStack, Grid } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { useEffect } from "react";
import {
  getCategoryPosts,
  addUserBid,
  finalizeSale,
} from "../../utilities/Posts";
import {
  Container,
  Box,
  GridItem,
  Center,
  Img,
  Heading,
  Link,
} from "@chakra-ui/react";
import "./Home.css";

function Home() {
  const userData = React.useContext(AuthContext);
  const [category, setCategory] = React.useState(null);
  const [currPosts, setCurrPosts] = React.useState([]);
  useEffect(() => {
    async function getPosts(category) {
      return await getCategoryPosts(category);
    }
    getPosts(category).then((posts) => {
      setCurrPosts(posts);
    });
  }, [category]);

  console.log("Currposts: ", currPosts, category);

  return (
    <Container maxW="100%" display="block" mb="16">
      <SideBar setCategory={setCategory} />

      <Center w="85%">
        <Grid templateColumns="repeat(3, 1fr)" gap={6} maxW="container.lg">
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
                      </Box>
                    </Box>
                  </Box>
                </Link>
              </GridItem>
            ))}
        </Grid>
      </Center>
    </Container>
  );
}

export default Home;
